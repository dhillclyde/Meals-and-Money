import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';
import { WebAppHost } from '../../components/WebAppHost';

/* iOS 26 draws this bar itself: real Liquid Glass, real minimize-on-scroll.
   We only hand it a tint, labels and SF Symbols. */
export default function Layout() {
  return (
    <WebAppHost module={require('../assets/money.html')} initialTab="Home">
      <NativeTabs
        minimizeBehavior="onScrollDown"
        tintColor={DynamicColorIOS({ light: '#2E5545', dark: '#77C9A5' })}
        labelStyle={{ color: DynamicColorIOS({ light: '#3C3C43', dark: '#EBEBF5' }) }}
      >
        <NativeTabs.Trigger name="home" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="activity" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'arrow.left.arrow.right', selected: 'arrow.left.arrow.right' }} md="circle" />
          <NativeTabs.Trigger.Label>Activity</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="income" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'arrow.down.circle', selected: 'arrow.down.circle.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Income</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="plan" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'chart.pie', selected: 'chart.pie.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Plan</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="goal" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'target', selected: 'target' }} md="circle" />
          <NativeTabs.Trigger.Label>Goal</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </WebAppHost>
  );
}
