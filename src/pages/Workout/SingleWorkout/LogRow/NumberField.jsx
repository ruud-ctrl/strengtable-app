import { Text } from "@components";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { Pressable, TextInput, View } from "react-native";
import { useTheme } from "@theme/useTheme";

function clamp(n, min, max) {
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
}

function parseInteger(raw, allowNegative) {
    let s = raw.replace(/[^\d-]/g, "");
    if (!allowNegative) s = s.replace(/-/g, "");
    else s = s.replace(/(?!^)-/g, ""); // only one leading '-'
    if (s === "" || s === "-") return { text: s, num: null };
    const num = Number.parseInt(s, 10);
    if (Number.isNaN(num)) return { text: s, num: null };
    return { text: s, num };
}

const InputIntegerField = forwardRef(
    (
        {
            // existing props
            label,
            helperText,
            errorText,

            value,
            defaultValue = null,
            onChangeNumber,

            min,
            max,
            step = 1,
            allowNegative = false,
            required = false,

            clearable = true,
            disabled = false,

            leftIconName,
            rightIconName,
            onLeftIconPress,
            onRightIconPress,

            containerStyle,
            inputStyle,

            placeholder,

            // NEW: unit text shown to the right of the input
            unitLabel,             // e.g. "reps"
            unitLabelStyle,

            ...rest
        },
        ref
    ) => {
        const { colors } = useTheme();
        const inputRef = useRef(null);

        const [text, setText] = useState(
            defaultValue === null || defaultValue === undefined
                ? ""
                : String(Math.trunc(defaultValue))
        );

        const currentNumber = useMemo(() => {
            const n = Number.parseInt(text, 10);
            return Number.isNaN(n) ? null : n;
        }, [text]);

        useEffect(() => {
            if (value === undefined) return; // uncontrolled
            const next = value === null ? "" : String(Math.trunc(value));
            setText(next);
        }, [value]);

        const emit = useCallback(
            (n) => {
                onChangeNumber?.(n);
            },
            [onChangeNumber]
        );

        const handleChangeText = useCallback(
            (raw) => {
                const { text: cleaned, num } = parseInteger(raw, allowNegative);
                setText(cleaned);
                emit(num);
            },
            [allowNegative, emit]
        );

        const commitWithClamp = useCallback(
            (n) => {
                let next = n;
                if (next === null) {
                    if (required) next = min ?? 0;
                } else {
                    next = clamp(next, min, max);
                    if (!allowNegative && next < 0) next = 0;
                }
                setText(next === null ? "" : String(next));
                emit(next);
            },
            [allowNegative, max, min, required, emit]
        );

        const onBlur = useCallback(() => {
            commitWithClamp(currentNumber);
        }, [commitWithClamp, currentNumber]);

        const increment = useCallback(() => {
            const base = currentNumber ?? (required ? (min ?? 0) : 0);
            commitWithClamp(base + step);
        }, [commitWithClamp, currentNumber, step, min, required]);

        const decrement = useCallback(() => {
            const base = currentNumber ?? (required ? (min ?? 0) : 0);
            commitWithClamp(base - step);
        }, [commitWithClamp, currentNumber, step, min, required]);

        useImperativeHandle(ref, () => ({
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
            getNumber: () => currentNumber,
            setNumber: (n) => commitWithClamp(n),
        }));

        const subtle = colors.contrast?.[300] ?? "#999";
        const textColor = colors.contrast?.[100] ?? "#fff";
        const placeholderColor = colors.contrast?.[300] ?? "#999";

        return (
            <View style={[{ flex: 1 }]}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={
                            {
                                flex: 1,
                                alignItems: "center",
                                flexDirection: "row",
                                borderRadius: 6,
                                borderWidth: 1,
                                borderColor: "#222",
                                backgroundColor: "#222",

                            }}
                    >

                        <TextInput
                            ref={inputRef}
                            editable={!disabled}
                            value={text}
                            onChangeText={handleChangeText}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderColor}
                            returnKeyType="done"
                            style={[
                                {
                                    flex: 1,
                                    textAlign: "center",
                                    color: textColor,
                                    paddingVertical: 6,
                                    minHeight: 32,
                                    paddingHorizontal: 6,
                                    opacity: disabled ? 0.6 : 1,
                                },
                                inputStyle,
                            ]}
                            {...rest}
                        />

                        {/* Unit label (e.g., "reps") */}

                        <Text
                            style={[
                                {
                                    display: "absulute",
                                    marginLeft: -24,
                                    marginRight: 12,
                                    color: "#666",
                                },
                                unitLabelStyle,
                            ]}
                            numberOfLines={1}
                        >
                            Reps
                        </Text>

                    </View>

                    <Pressable
                        onPress={decrement}
                        disabled={disabled}
                        hitSlop={10}
                        style={{
                            padding: 2,
                            marginLeft: 4,
                            backgroundColor: "#222",
                            minHeight: 32,
                            minWidth: 32,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons name="remove-outline" size={20} color={subtle} />
                    </Pressable>

                    <Pressable
                        onPress={increment}
                        disabled={disabled}
                        hitSlop={10}
                        style={{
                            padding: 2,
                            marginLeft: 4,
                            backgroundColor: "#222",
                            minHeight: 32,
                            minWidth: 32,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons name="add-outline" size={20} color={subtle} />
                    </Pressable>
                </View>
            </View>
        );
    }
);

export default InputIntegerField;
