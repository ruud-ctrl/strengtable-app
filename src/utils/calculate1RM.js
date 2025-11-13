export function calculate1RM(weight, reps, formula = "epley") {
    if (reps <= 0 || weight <= 0) return 0;
  
    switch (formula.toLowerCase()) {
      case "epley":
        return weight * (1 + reps / 30);
      case "brzycki":
        return weight * 36 / (37 - reps);
      case "lombardi":
        return weight * Math.pow(reps, 0.10);
      default:
        throw new Error("Unsupported formula. Use 'epley', 'brzycki', or 'lombardi'.");
    }
  }