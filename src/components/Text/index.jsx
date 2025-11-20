import { useTheme } from '@theme/useTheme';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  h1: { fontSize: 32, lineHeight: 38, fontWeight: '700', letterSpacing: 0.2 },
  h2: { fontSize: 18, lineHeight: 34, fontWeight: '500', letterSpacing: 0 },
  h3: { fontSize: 16, lineHeight: 28, fontWeight: '200' },
  h4: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  h5: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  h6: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  p:  { fontSize: 14, lineHeight: 20, fontWeight: '300' },
  small:   { fontSize: 12, lineHeight: 18, fontWeight: '300' },
  caption: { fontSize: 11, textTransform: "uppercase", lineHeight: 18, paddingBottom: 0, fontWeight: '500', opacity: 0.6 },
});

const ramp = (obj, key, def) => obj?.[key] ?? def;

function TextComp({
  children,
  variant = 'p',
  color,
  style,
  ...rest
}) {
  const theme = useTheme();
  const fallbackColor = ramp(theme.colors.contrast, 200, '#111')
  
  const themedColor = color ?? theme?.colors?.text?.primary ?? fallbackColor;

  const isHeading = String(variant).startsWith('h');

  return (
    <RNText
      {...rest}
      accessibilityRole={isHeading ? 'header' : undefined}
      style={[{ color: themedColor }, styles[variant] ?? styles.p, style]}
    >
      {children}
    </RNText>
  );
}

export const Text = (p) => <TextComp {...p} />;
export const H1 = (p) => <TextComp variant="h1" {...p} />;
export const H2 = (p) => <TextComp variant="h2" {...p} />;
export const H3 = (p) => <TextComp variant="h3" {...p} />;
export const H4 = (p) => <TextComp variant="h4" {...p} />;
export const H5 = (p) => <TextComp variant="h5" {...p} />;
export const H6 = (p) => <TextComp variant="h6" {...p} />;
export const P  = (p) => <TextComp variant="p" {...p} />;
export const Small = (p) => <TextComp variant="small" {...p} />;
export const Caption = (p) => <TextComp variant="caption" {...p} />;
