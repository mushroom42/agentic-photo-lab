import { generateAssignment } from "./photography/generate-assignment.js";

const examples = [
  {
    label: "Monochrome indoor practice",
    input: {
      scene: "indoor" as const,
      film: { colorMode: "monochrome" as const, iso: 400, framesRemaining: 12 },
      lens: { focalLengths: [50] },
      shotBudget: 12,
      recentCandidateIds: [],
      seed: 42,
    },
  },
  {
    label: "Color city practice",
    input: {
      scene: "city" as const,
      film: { colorMode: "color" as const, iso: 200, framesRemaining: 24 },
      lens: { focalLengths: [35] },
      shotBudget: 10,
      recentCandidateIds: [],
      seed: 1,
    },
  },
];

for (const example of examples) {
  console.log(`\n${example.label}`);
  console.log(JSON.stringify(generateAssignment(example.input), null, 2));
}
