export function calculateTRM(weight, repsPerformed, targetReps, formula = "epley") {
  if (weight <= 0 || repsPerformed <= 0 || targetReps <= 0) return 0;

  let estimated1RM;

  switch (formula.toLowerCase()) {
    case "epley":
      estimated1RM = weight * (1 + repsPerformed / 30);
      return estimated1RM / (1 + targetReps / 30);

    case "brzycki":
      estimated1RM = weight * 36 / (37 - repsPerformed);
      return estimated1RM * (37 - targetReps) / 36;

    case "lombardi":
      estimated1RM = weight * Math.pow(repsPerformed, 0.10);
      return estimated1RM / Math.pow(targetReps, 0.10);

    default:
      throw new Error("Unsupported formula. Use 'epley', 'brzycki', or 'lombardi'.");
  }
}
