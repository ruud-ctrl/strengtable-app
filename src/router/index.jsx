import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "@theme/useTheme";

import Home from "@pages/Home";

import Profile from "@pages/Profile";

import Programs from "@pages/Program";
import CreateNewProgram from "@pages/Program/CreateNewProgram";
import SingleProgram from "@pages/Program/SingleProgram";

import Exercises from "@pages/Exercise";
import CreateNewExercise from "@pages/Exercise/CreateNewExercise";
import SingleExercise from "@pages/Exercise/SingleExercise";

import Workouts from "@pages/Workout";
import SingleWorkout from "@pages/Workout/SingleWorkout";

import WeightHistory from "@pages/WeightHistory";
import CreateNewWorkout from "@pages/Workout/CreateNewWorkout";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer >
      <Tabs />
    </NavigationContainer>
  );
}

function Tabs() {
  const { colors, theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.contrast[100],
        tabBarInactiveTintColor: colors.contrast[900],
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: "",
          tabBarStyle: {
            borderColor: colors.tabBarBackgroundColor,
            backgroundColor: colors.tabBarBackgroundColor,
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      >
        {() => (
          <StackWrapper
            colors={colors}
            initial={{ name: "Home", component: Home, title: "Home" }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="WorkoutTab"
        options={{
          tabBarLabel: "",
          tabBarStyle: {
            borderColor: theme == "dark" ? colors.base[0] : colors.contrast[900],
            backgroundColor: colors.base[300],
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="triangle-outline" color={color} />
          ),
        }}
      >
        {() => (
          <StackWrapper
            colors={colors}
            initial={{ name: "Workouts", component: Workouts, title: "Workouts" }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ProgramsTab"
        options={{
          tabBarLabel: "",
          tabBarStyle: {
            borderColor: theme == "dark" ? colors.base[0] : colors.contrast[900],
            backgroundColor: colors.base[300],
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-outline" color={color} />
          ),
        }}
      >
        {() => (
          <StackWrapper
            colors={colors}
            initial={{ name: "Programs", component: Programs, title: "Programs" }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: "",
          tabBarStyle: {
            borderColor: theme == "dark" ? colors.base[0] : colors.contrast[900],
            backgroundColor: colors.base[300],
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
        }}
      >
        {() => (
          <StackWrapper
            colors={colors}
            initial={{ name: "Profile", component: Profile }}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

function StackWrapper({ colors, initial }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name={initial.name} component={initial.component} />

      <Stack.Screen name="SingleProgram" component={SingleProgram} options={{ title: "SingleProgram" }} />
      <Stack.Screen name="Create New Program" component={CreateNewProgram} options={{ title: "Create New Program" }} />

      <Stack.Screen name="Exercises" component={Exercises} options={{ title: "Exercises" }} />
      <Stack.Screen name="SingleExercise" component={SingleExercise} options={{ title: "SingleExercise" }} />
      <Stack.Screen name="Create New Exercise" component={CreateNewExercise} options={{ title: "Create New Exercise" }} />
      
      <Stack.Screen name="SingleWorkout" component={SingleWorkout} options={{ title: "SingleWorkout" }} />
      <Stack.Screen name="Create New Workout" component={CreateNewWorkout} options={{ title: "Create New Workout" }} />

      <Stack.Screen name="WeightHistory" component={WeightHistory} options={{ title: "Weight History" }} />

    </Stack.Navigator >
  );
}

function TabBarIcon({ name, color }) {
  return (
    <Ionicons
      name={name}
      size={24}
      color={color}
      style={{ marginBottom: -20 }}
    />
  );
}
