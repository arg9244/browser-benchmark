// Catppuccin Mocha Theme Colors
export const colors = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
  text: '#cdd6f4',
  subtext1: '#bac2de',
  subtext0: '#a6adc8',
  overlay2: '#9399b2',
  overlay1: '#7f849c',
  overlay0: '#6c7086',
  surface2: '#585b70',
  surface1: '#45475a',
  surface0: '#313244',
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#11111b',
};

// Browser color assignments
export const browserColors: Record<string, string> = {
  'brave-origin': colors.peach,
  'chromium': colors.blue,
  'firefox-esr': colors.red,
  'firefox-pure': colors.maroon,
  'firefox-wayland-cachy-hg': colors.pink,
  'floorp': colors.mauve,
  'vivaldi': colors.red,
  'waterfox': colors.sapphire,
  'zen': colors.lavender,
};

// Assign colors dynamically based on order
export const chartPalette = [
  colors.blue,
  colors.peach,
  colors.green,
  colors.mauve,
  colors.red,
  colors.teal,
  colors.yellow,
  colors.pink,
  colors.lavender,
  colors.sapphire,
  colors.flamingo,
  colors.maroon,
  colors.sky,
];
