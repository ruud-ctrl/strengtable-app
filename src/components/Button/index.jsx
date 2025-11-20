import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@theme/useTheme';
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native';

const SIZES = {
  sm: { padH: 8, font: 12, icon: 14, height: 32 },
  md: {  padH: 8, font: 14, icon: 16, height: 32 },
  lg: { padH: 20, font: 18, icon: 20, height: 32 },
};

// small helper with safe fallbacks
const get = (obj, path, fallback) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback;

function computeVariantColors(colors, variant) {
  const baseBtnBg    = get(colors, 'controls.button.backgroundColor', '#1E1E1E');
  const baseBtnText  = get(colors, 'controls.button.textColor', '#FFFFFF');
  const baseBtnBorder= get(colors, 'controls.button.borderColor', '#333333');

  // accent ramp for "brand" color
  const accent200 = get(colors, 'accent.200', '#3ddac5');
  const accent100 = get(colors, 'accent.100', accent200);
  const accentTxt = get(colors, 'text.light', '#FFFFFF');   // text on accent
  const contrastMain = get(colors, 'text.main', '#111111'); // readable on light

  switch (variant) {
    case 'primary':
      return {
        bg: accent200,
        text: accentTxt,
        border: accent200,
        ripple: 'rgba(255,255,255,0.15)',
      };
    case 'secondary':
      return {
        bg: baseBtnBg,
        text: baseBtnText,
        border: baseBtnBorder,
        ripple: 'rgba(0,0,0,0.08)',
      };
    case 'outline':
      return {
        bg: 'transparent',
        text: accent200,
        border: accent200,
        ripple: 'rgba(0,0,0,0.06)',
      };
    case 'ghost':
    default:
      return {
        bg: 'transparent',
        text: accent100,
        border: 'transparent',
        ripple: 'rgba(0,0,0,0.06)',
      };
  }
}

export default function Button({
  title,
  onPress,
  variant = 'primary',      // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',              // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  leftIcon,                 // Ionicons name
  rightIcon,                // Ionicons name
  fullWidth = false,
  style,
  textStyle,
  iconProps,
  ...rest
}) {
  const { colors, theme } = useTheme();
  const sz = SIZES[size] ?? SIZES.md;

  // read core chrome from theme.controls.button
  const baseRadius   = get(colors, 'controls.button.borderRadius', 8);
  const baseBWidth   = get(colors, 'controls.button.borderWidth', 1);
  const baseBorder   = get(colors, 'controls.button.borderColor', '#333333');

  const c = computeVariantColors(colors, variant);
  const contentColor = c.text;

  return (
    <Pressable
      {...rest}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      onPress={onPress}
      android_ripple={Platform.OS === 'android' ? { color: c.ripple, borderless: false } : undefined}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : (pressed ? 0.92 : 1),
          backgroundColor: c.bg,
          borderColor: variant === 'outline' ? c.border : (variant === 'secondary' ? baseBorder : c.border),
          borderWidth: variant === 'ghost' ? 0 : baseBWidth,
          minHeight: sz.height,
          paddingHorizontal: sz.padH,
          borderRadius: baseRadius,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          ...(fullWidth ? { alignSelf: 'stretch' } : { alignSelf: 'baseline' }),
          ...(variant === 'primary' || variant === 'secondary'
            ? (Platform.OS === 'ios'
                ? { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }
                : { elevation: 1 })
            : null),
        },
        style,
      ]}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={contentColor} />
      ) : (
        <>
          {leftIcon ? (
            <Ionicons
              name={leftIcon}
              size={sz.icon}
              color={contentColor}
              style={{ marginRight: title ? 8 : 0 }}
              {...iconProps}
            />
          ) : null}
          {title ? (
            <Text
              style={[
                {
                  color: contentColor,
                  fontSize: sz.font,
                  lineHeight: Math.round(sz.font * 1.25),
                  fontWeight: '600',
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          ) : null}
          {rightIcon ? (
            <Ionicons
              name={rightIcon}
              size={sz.icon}
              color={contentColor}
              style={{ marginLeft: title ? 8 : 0 }}
              {...iconProps}
            />
          ) : null}
        </>
      )}
    </Pressable>
  );
}
