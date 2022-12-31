import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface IPageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("screen");
const SIZE = width * 0.8;
export default function Page({ title, index, translateX }: IPageProps) {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-SIZE, 0, SIZE],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <View
      key={index.toString()}
      style={[
        styles.page,
        { backgroundColor: `rgba(0,60,250,${index * 0.15})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height,
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: `#4062d1`,
  },
  text: {
    fontSize: 60,
    color: "white",
    textTransform: "uppercase",
  },
});
