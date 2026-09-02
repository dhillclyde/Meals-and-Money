import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';
import { WebAppHost } from '../../components/WebAppHost';

/* iOS 26 draws this bar itself: real Liquid Glass, real minimize-on-scroll.
   We only hand it a tint, labels and SF Symbols. */
export default function Layout() {
  return (
    <WebAppHost module={require('../assets/meal.html')} initialTab="Planner">
      <NativeTabs
        minimizeBehavior="onScrollDown"
        tintColor={DynamicColorIOS({ light: '#C0596B', dark: '#F2A9B5' })}
        labelStyle={{ color: DynamicColorIOS({ light: '#3C3C43', dark: '#EBEBF5' }) }}
      >
        <NativeTabs.Trigger name="planner" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'calendar', selected: 'calendar' }} md="circle" />
          <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="recipes" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'book.closed', selected: 'book.closed.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Recipes</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="shopping" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'bag', selected: 'bag.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Shopping</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="buy-list" contentStyle={{ backgroundColor: 'transparent' }}>
          <NativeTabs.Trigger.Icon sf={{ default: 'cart', selected: 'cart.fill' }} md="circle" />
          <NativeTabs.Trigger.Label>Buy List</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </WebAppHost>
  );
}
