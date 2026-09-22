import fs from "fs";
import path from "path";

export interface Voter {
  identifier: string; // Email / NIM
  password: string;
  has_voted: boolean;
  voted_at: string | null;
}

export interface VoteRecord {
  id: string;
  candidate_id: number;
  created_at: string;
}

export interface Candidate {
  id: number;
  candidate_number: number;
  ketua_name: string;
  ketua_role: string;
  manager_name: string;
  manager_role: string;
  visi: string;
  misi: string[];
  photo_url: string;
}

export const CANDIDATES: Candidate[] = [
  {
    id: 1,
    candidate_number: 1,
    ketua_name: "Try Arfandi",
    ketua_role: "Calon Ketua Umum KIP-Kuliah",
    manager_name: "Viola Saraswita",
    manager_role: "Campaign Manager",
    visi: "Mewujudkan Formadiksi KIP Kuliah PNJ sebagai wadah inklusif, berintegritas tinggi, dan berdaya saing dalam mencetak insan akademis yang adaptif dan solutif bagi almamater serta masyarakat.",
    misi: [
      "Menguatkan sinergi internal Formadiksi melalui transparansi komunikasi dan tata kelola organisasi yang akuntabel.",
      "Memfasilitasi peningkatan kompetensi akademik dan soft-skill mahasiswa penerima KIP-K melalui program pelatihan berkala.",
      "Mengawal dan menjamin hak serta aspirasi mahasiswa KIP-K PNJ secara proaktif kepada pihak birokrasi kampus.",
      "Menumbuhkan jiwa kepedulian sosial kemasyarakatan melalui aksi pengabdian nyata berbasis keilmuan vokasi."
    ],
    photo_url: "/images/calon-1.jpeg",
  },
  {
    id: 2,
    candidate_number: 2,
    ketua_name: "Fatir Rifai",
    ketua_role: "Calon Ketua Umum KIP-Kuliah",
    manager_name: "Nayla Shofwanurromah",
    manager_role: "Campaign Manager",
    visi: "Mentransformasikan Formadiksi KIP Kuliah PNJ menjadi organisasi yang progresif, kolaboratif, dan energik dalam memberdayakan potensi mahasiswa berprestasi.",
    misi: [
      "Membangun ekosistem pengembangan bakat dan karier mahasiswa KIP Kuliah secara terarah dan berkesinambungan.",
      "Mengoptimalkan kemitraan strategis dengan alumni Formadiksi dan lembaga profesional untuk perluasan jejaring relasi kerja.",
      "Menyelenggarakan advokasi mahasiswa yang responsif, cepat tanggap, dan solutif terhadap setiap kendala perkuliahan.",
      "Mendorong inovasi digital dalam setiap pelayanan serta kegiatan kemahasiswaan Formadiksi PNJ."
    ],
    photo_url: "/images/calon-2.jpeg",
  },
];

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "db_state.json");
const VOTERS_RAW_PATH = path.join(DB_DIR, "voters.json");

interface DatabaseState {
  voters: Record<string, Voter>;
  votes: VoteRecord[];
}

function initDbState(): DatabaseState {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_PATH)) {
    try {
      const content = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse db_state.json, re-initializing", e);
    }
  }

  // Load from extracted voters.json
  let rawUsers: { identifier: string; password: string }[] = [];
  if (fs.existsSync(VOTERS_RAW_PATH)) {
    try {
      rawUsers = JSON.parse(fs.readFileSync(VOTERS_RAW_PATH, "utf-8"));
    } catch (e) {
      console.error("Failed to parse voters.json", e);
    }
  }

  const votersMap: Record<string, Voter> = {};
  for (const u of rawUsers) {
    const key = u.identifier.toLowerCase().trim();
    votersMap[key] = {
      identifier: u.identifier.trim(),
      password: u.password.trim(),
      has_voted: false,
      voted_at: null,
    };
  }

  const state: DatabaseState = {
    voters: votersMap,
    votes: [],
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  return state;
}

// In-memory cache synced with disk
let cachedState: DatabaseState | null = null;

function getState(): DatabaseState {
  if (!cachedState) {
    cachedState = initDbState();
  }
  return cachedState;
}

function saveState(state: DatabaseState) {
  cachedState = state;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing db state to disk:", err);
  }
}

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "4dm1npilkadikip2026";

export function getVoter(identifier: string): Voter | null {
  const state = getState();
  const key = identifier.toLowerCase().trim();
  return state.voters[key] || null;
}

export function verifyVoterCredentials(identifier: string, password: string): { success: boolean; voter?: Voter; message?: string } {
  const voter = getVoter(identifier);
  if (!voter) {
    return { success: false, message: "Akun (Email / NIM) tidak terdaftar di DPT KIP PNJ." };
  }
  if (voter.password !== password.trim()) {
    return { success: false, message: "Kata sandi yang Anda masukkan salah." };
  }
  return { success: true, voter };
}

/**
 * Cast vote atomically with one-person-one-vote lock
 */
export function recordVote(identifier: string, candidateId: number): { success: boolean; message: string; votedAt?: string } {
  const state = getState();
  const key = identifier.toLowerCase().trim();
  const voter = state.voters[key];

  if (!voter) {
    return { success: false, message: "Data pemilih tidak ditemukan." };
  }

  if (voter.has_voted) {
    return { success: false, message: "Hak suara Anda sudah digunakan sebelumnya." };
  }

  if (candidateId !== 1 && candidateId !== 2) {
    return { success: false, message: "Pasangan calon tidak valid." };
  }

  const votedAt = new Date().toISOString();
  
  // Atomic-like update in state
  voter.has_voted = true;
  voter.voted_at = votedAt;

  // Add anonymous ballot
  state.votes.push({
    id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    candidate_id: candidateId,
    created_at: votedAt,
  });

  saveState(state);
  return { success: true, message: "Suara Anda berhasil dicatat secara sah!", votedAt };
}

export function getAdminStats() {
  const state = getState();
  const votersList = Object.values(state.voters);
  const totalDPT = votersList.length;
  const totalVoted = votersList.filter((v) => v.has_voted).length;
  const totalUnvoted = totalDPT - totalVoted;
  const turnoutPercent = totalDPT > 0 ? ((totalVoted / totalDPT) * 100).toFixed(1) : "0.0";

  const votesPaslon1 = state.votes.filter((v) => v.candidate_id === 1).length;
  const votesPaslon2 = state.votes.filter((v) => v.candidate_id === 2).length;
  const totalVotesCounted = state.votes.length;

  return {
    totalDPT,
    totalVoted,
    totalUnvoted,
    turnoutPercent,
    votesPaslon1,
    votesPaslon2,
    percentPaslon1: totalVotesCounted > 0 ? ((votesPaslon1 / totalVotesCounted) * 100).toFixed(1) : "0.0",
    percentPaslon2: totalVotesCounted > 0 ? ((votesPaslon2 / totalVotesCounted) * 100).toFixed(1) : "0.0",
    totalVotesCounted,
  };
}

export function getAllVotersAudit() {
  const state = getState();
  return Object.values(state.voters).map((v) => ({
    identifier: v.identifier,
    has_voted: v.has_voted,
    voted_at: v.voted_at,
  }));
}
