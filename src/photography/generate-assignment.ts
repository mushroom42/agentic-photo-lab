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
  shotBudget: number;
  recentCandidateIds: string[];
  seed: number;
}

export interface AssignmentComponent {
  id: string;
  title: string;
  instruction: string;
}

export interface Assignment {
  id: string;
  scene: Scene;
  theme: AssignmentComponent;
  technique: AssignmentComponent;
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
  maxShots: number;
}

interface ThemeCandidate extends Candidate {
  requiresColor: boolean;
}

const themes: ThemeCandidate[] = [
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

const techniques: Candidate[] = [
  {
    id: "symmetry",
    scenes: ["indoor", "city", "travel"],
    title: "Symmetry",
    instruction: "Align the frame around a clear axis of symmetry.",
    maxShots: 12,
  },
  {
    id: "frame-within-frame",
    scenes: ["indoor", "city", "forest", "travel"],
    title: "Frame within a frame",
    instruction: "Use an opening, branch, or shadow to contain the subject.",
    maxShots: 10,
  },
  {
    id: "layering",
    scenes: ["city", "forest", "travel"],
    title: "Layering",
    instruction: "Build distinct foreground, middle, and background layers.",
    maxShots: 12,
  },
];

function selectPreferred<T extends Candidate>(
  candidates: T[],
  recentCandidateIds: string[],
  seed: number,
): T | undefined {
  const notRecent = candidates.filter(
    (candidate) => !recentCandidateIds.includes(candidate.id),
  );
  const preferred = notRecent.length > 0 ? notRecent : candidates;
  const normalizedSeed = Math.trunc(Math.abs(seed));
  return preferred[normalizedSeed % preferred.length];
}

export function generateAssignment(input: AssignmentInput): GenerationResult {
  const focalLength = input.lens.focalLengths[0];
  const invalidReasons: string[] = [];
  if (focalLength === undefined) {
    invalidReasons.push("lens.focalLengths must contain a usable focal length");
  }
  if (input.film.framesRemaining < 1) {
    invalidReasons.push("film.framesRemaining must be positive");
  }
  if (input.shotBudget < 1) {
    invalidReasons.push("shotBudget must be positive");
  }
  if (!Number.isFinite(input.seed)) {
    invalidReasons.push("seed must be finite");
  }
  if (invalidReasons.length > 0 || focalLength === undefined) {
    return { ok: false, reasons: invalidReasons };
  }

  const eligibleThemes = themes.filter(
    (theme) =>
      theme.scenes.includes(input.scene) &&
      !(input.film.colorMode === "monochrome" && theme.requiresColor),
  );
  const eligibleTechniques = techniques.filter((technique) =>
    technique.scenes.includes(input.scene),
  );
  const theme = selectPreferred(
    eligibleThemes,
    input.recentCandidateIds,
    input.seed,
  );
  const technique = selectPreferred(
    eligibleTechniques,
    input.recentCandidateIds,
    input.seed + 1,
  );
  if (theme === undefined || technique === undefined) {
    return { ok: false, reasons: ["No candidate satisfies the hard constraints"] };
  }

  return {
    ok: true,
    assignment: {
      id: `${theme.id}:${technique.id}`,
      scene: input.scene,
      theme: {
        id: theme.id,
        title: theme.title,
        instruction: theme.instruction,
      },
      technique: {
        id: technique.id,
        title: technique.title,
        instruction: technique.instruction,
      },
      requiresColor: theme.requiresColor,
      focalLength,
      maxShots: Math.min(
        theme.maxShots,
        technique.maxShots,
        input.film.framesRemaining,
        input.shotBudget,
      ),
    },
  };
}
