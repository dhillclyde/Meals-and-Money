import { Asset } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from 'expo-router';

const Ctx = createContext(null);

/* runs before the page's own script: tells the app a native tab bar owns navigation */
const BEFORE = `window.__HIDE_WEB_NAV__ = true; true;`;

export function WebAppHost({ module: mod, initialTab, children }) {
  const ref = useRef(null);
  const [uri, setUri] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const asset = Asset.fromModule(mod);
      await asset.downloadAsync();
      if (alive) setUri(asset.localUri || asset.uri);
    })();
    return () => { alive = false; };
  }, [mod]);

  const setTab = useCallback((tab) => {
    ref.current?.injectJavaScript(
      `window.__setTab && window.__setTab(${JSON.stringify(tab)}); window.scrollTo({top:0}); true;`
    );
  }, []);

  const onMessage = (e) => {
    try {
      const m = JSON.parse(e.nativeEvent.data);
      if (m.t === 'haptic') {
        Haptics.impactAsync(
          m.kind === 'select' ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Soft
        );
      }
    } catch {}
  };

  return (
    <Ctx.Provider value={{ setTab }}>
      <View style={styles.fill}>
        {uri ? (
          <WebView
            ref={ref}
            source={{ uri }}
            originWhitelist={['*']}
            allowFileAccess
            allowFileAccessFromFileURLs
            allowUniversalAccessFromFileURLs
            injectedJavaScriptBeforeContentLoaded={BEFORE}
            onMessage={onMessage}
            onLoadEnd={() => setTab(initialTab)}
            /* the native tab bar floats over the page: keep its own footer padding */
            contentInsetAdjustmentBehavior="never"
            bounces
            style={styles.fill}
          />
        ) : (
          <View style={[styles.fill, styles.center]}>
            <ActivityIndicator />
          </View>
        )}
        {children}
      </View>
    </Ctx.Provider>
  );
}

/* every tab screen is an empty transparent sheet — it only steers the shared WebView */
export function TabScreen({ tab }) {
  const host = useContext(Ctx);
  useFocusEffect(
    useCallback(() => {
      host?.setTab(tab);
    }, [host, tab])
  );
  return <View style={styles.transparent} collapsable={false} />;
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  transparent: { flex: 1, backgroundColor: 'transparent' },
});
