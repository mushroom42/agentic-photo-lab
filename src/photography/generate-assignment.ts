export type Scene = "indoor" | "city" | "forest" | "travel";
export type ColorMode = "color" | "monochrome";

export interface AssignmentInput {
  scene: Scene;
  film: {
    colorMode: ColorMode;
    iso: number;
    framesRemaining: number;
  };
  lens: {
    focalLengths: number[];
  };
  recentCandidateIds: string[];
  seed: number;
}

export interface Assignment {
  id: string;
  scene: Scene;
  title: string;
  instruction: string;
  requiresColor: boolean;
  focalLength: number;
  maxShots: number;
}

export type GenerationResult =
  | { ok: true; assignment: Assignment }
  | { ok: false; reasons: string[] };

interface Candidate {
  id: string;
  scenes: Scene[];
  title: string;
  instruction: string;
  requiresColor: boolean;
  maxShots: number;
}

const candidates: Candidate[] = [
  {
    id: "negative-space",
    scenes: ["indoor", "city", "forest", "travel"],
    title: "Negative space",
    instruction: "Keep the subject below twenty percent of the frame.",
    requiresColor: false,
    maxShots: 12,
  },
  {
    id: "red-accent",
    scenes: ["city", "travel"],
    title: "A single red accent",
    instruction: "Use one red element as the visual anchor.",
    requiresColor: true,
    maxShots: 10,
  },
  {
    id: "window-light",
    scenes: ["indoor"],
    title: "Window light",
    instruction: "Build the frame around light falling through one window.",
    requiresColor: false,
    maxShots: 8,
  },
];

export function generateAssignment(input: AssignmentInput): GenerationResult {
  const focalLength = input.lens.focalLengths[0];
  const invalidReasons: string[] = [];
  if (focalLength === undefined) {
    invalidReasons.push("lens.focalLengths must contain a usable focal length");
  }
  if (input.film.framesRemaining < 1) {
    invalidReasons.push("film.framesRemaining must be positive");
  }
  if (invalidReasons.length > 0 || focalLength === undefined) {
    return { ok: false, reasons: invalidReasons };
  }

  const eligible = candidates.filter(
    (candidate) =>
      candidate.scenes.includes(input.scene) &&
      !(input.film.colorMode === "monochrome" && candidate.requiresColor),
  );
  const notRecent = eligible.filter(
    (candidate) => !input.recentCandidateIds.includes(candidate.id),
  );
  const preferred = notRecent.length > 0 ? notRecent : eligible;
  const candidate = preferred[Math.abs(input.seed) % preferred.length];
  if (candidate === undefined) {
    return { ok: false, reasons: ["No candidate satisfies the hard constraints"] };
  }

  return {
    ok: true,
    assignment: {
      id: candidate.id,
      scene: input.scene,
      title: candidate.title,
      instruction: candidate.instruction,
      requiresColor: candidate.requiresColor,
      focalLength,
      maxShots: Math.min(candidate.maxShots, input.film.framesRemaining),
    },
  };
}
