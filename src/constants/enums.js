export const MuscleGroup = [
  "Chest",
  "Triceps",
  "Upper Back",
  "Biceps",
  "Calves",
  "Lower Back",
  "Lats",
  "Quads",
  "Glutes",
  "Forearms",
  "Hamstrings",
  "Shoulders",
  "Abdominals",
  "Abductors",
  "Adductors",
];

export const EquipmentType = [
  "Bodyweight",
  "Barbell",
  "Machine",
  "Dumbbell",
  "Kettlebell",
  "Plate",
  "Resistance Band",
  "Cable",
  "Smith Machine",
];

export const ExerciseType = [
  "Weight & Reps",
  "Bodyweight Reps",
  "Weighted Bodyweight",
  "Assisted Bodyweight",
];

export const WorkoutState   = ["Active", "Completed"];
export const ProgramState   = ["Creating", "Active"];
export const UserRole       = ["User", "Admin", "Premium"];
export const UserStatus     = ["Pending", "Verified", "Approved", "Rejected"];
export const Theme          = ["light", "dark"];
export const Units          = ["metric", "imperial"];
export const CookieConsent  = ["accepted", "rejected"];

export const toOptions = (values) =>
  values.map((v) => ({ label: v, value: v }));

export const MuscleGroupOptions  = toOptions(MuscleGroup);
export const EquipmentTypeOptions= toOptions(EquipmentType);
export const ExerciseTypeOptions = toOptions(ExerciseType);
export const WorkoutStateOptions = toOptions(WorkoutState);
export const ProgramStateOptions = toOptions(ProgramState);
export const UserRoleOptions     = toOptions(UserRole);
export const UserStatusOptions   = toOptions(UserStatus);
export const ThemeOptions        = toOptions(Theme);
export const UnitsOptions        = toOptions(Units);
export const CookieConsentOptions= toOptions(CookieConsent);

const includes = (arr, v) => arr.includes(v);

export const isMuscleGroup   = (v) => includes(MuscleGroup, v);
export const isEquipmentType = (v) => includes(EquipmentType, v);
export const isExerciseType  = (v) => includes(ExerciseType, v);
export const isWorkoutState  = (v) => includes(WorkoutState, v);
export const isProgramState  = (v) => includes(ProgramState, v);
export const isUserRole      = (v) => includes(UserRole, v);
export const isUserStatus    = (v) => includes(UserStatus, v);
export const isThemeValue    = (v) => includes(Theme, v);
export const isUnitsValue    = (v) => includes(Units, v);
export const isCookieConsent = (v) => includes(CookieConsent, v);


export const normalizeEquipmentTypeForDb = (input) => {
  if (isEquipmentType(input)) return input;
  throw new Error(`Invalid EquipmentType: ${input}`);
};
