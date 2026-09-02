import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const cards = [
  { href: '/meal/planner', title: 'Meal Planner', sub: 'Planner · Recipes · Shopping · Buy List', bg: '#EBA7B0', fg: '#3C1B23' },
  { href: '/money/home', title: 'Money HQ', sub: 'Home · Activity · Income · Plan · Goal', bg: '#2E5545', fg: '#EAF2EC' },
];

export default function Chooser() {
  return (
    <View style={s.wrap}>
      <Text style={s.kicker}>OPEN AN APP</Text>
      {cards.map((c) => (
        <Link key={c.href} href={c.href} asChild>
          <Pressable style={({ pressed }) => [s.card, { backgroundColor: c.bg, opacity: pressed ? 0.9 : 1 }]}>
            <Text style={[s.title, { color: c.fg }]}>{c.title}</Text>
            <Text style={[s.sub, { color: c.fg }]}>{c.sub}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F7F4ED', padding: 20, paddingTop: 80, gap: 14 },
  kicker: { fontSize: 12, letterSpacing: 1.6, fontWeight: '700', color: '#8A8378', marginBottom: 6 },
  card: { borderRadius: 22, padding: 22, gap: 6 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.4 },
  sub: { fontSize: 13, opacity: 0.8 },
});
