import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

interface Props {
  tabs: any[];
  activeTab?: number;
  animated?: boolean;
  cyclicSwipeEnable?: boolean;
  renderTab: (tab: any) => React.ReactElement;
  onTabActive: (index: number) => void;
}

const CircularTabView: React.FC<Props> = ({
  tabs = [],
  renderTab,
  activeTab,
  animated,
  cyclicSwipeEnable,
  onTabActive,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(activeTab ?? 0);
  const [itemLayout, setItemLayout] = useState<any>(null);
  const scrollOffset = useRef(new Animated.Value(0)).current;

  const indexLeft = activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
  const indexRight =
    activeTabIndex === tabs.length - 1 ? 0 : activeTabIndex + 1;

  useEffect(() => {
    // handle case if last tab is removed
    if (activeTabIndex >= tabs.length - 1) {
      const nextTab = tabs.length - 1;
      setActiveTabIndex(nextTab); // update active tab

      if (onTabActive) {
        // inform parent compoenet, active tab is updated
        onTabActive(nextTab);
      }
    }

    // update scroll offset
    const newOffset = tabs.length === 1 ? 0 : itemLayout?.width ?? 0;
    scrollOffset.setValue(newOffset);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  useEffect(() => {
    // if active tab is update via props(activeTab)
    if (activeTab !== undefined && activeTab !== activeTabIndex) {
      if (itemLayout && animated) {
        const {width} = itemLayout;
        const scrollValue =
          (activeTab - activeTabIndex) * (itemLayout?.width ?? 0);
        Animated.timing(scrollOffset, {
          toValue: scrollValue,
          duration: 100,
          useNativeDriver: false, // native driver is not supporting right position of view
        }).start(() => {
          scrollOffset.setValue(width);
          setActiveTabIndex(activeTab);
        });
      } else {
        setActiveTabIndex(activeTab);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (!tabs || tabs?.length === 0 || !renderTab) {
    // mendatory props should be there
    throw Error('CircularTab : Please provide correct props');
  }

  // check if swipe is allowed
  function shouldAllowSwipe(translationX: number) {
    if (!cyclicSwipeEnable) {
      if (
        (activeTabIndex === 0 && translationX > 0) ||
        (activeTabIndex === tabs.length - 1 && translationX < 0)
      ) {
        // disable swipe for first and last tab if cyclicSwipe is not Enabled
        return false;
      }
    }
    return true;
  }

  function onReleasePan({nativeEvent}: any) {
    const {translationX, velocityX} = nativeEvent;

    // swipe gesture is not there
    if (velocityX === 0) {
      return;
    }

    if (!shouldAllowSwipe(translationX)) {
      return;
    }

    const {width} = itemLayout;
    let nextTab: number, scrollValue: number;

    if (Math.abs(translationX) < width / 2) {
      // leave it to same offset
      nextTab = activeTabIndex;
      scrollValue = width;
    } else if (translationX > width / 2) {
      // move to previous tab
      nextTab = indexLeft;
      scrollValue = 0;
    } else {
      // move to next tab
      scrollValue = 2 * width;
      nextTab = indexRight;
    }

    Animated.timing(scrollOffset, {
      toValue: scrollValue,
      duration: 200,
      useNativeDriver: false, // native driver is not supporting right position of view
    }).start(() => {
      scrollOffset.setValue(width);
      setActiveTabIndex(nextTab);

      // update parent when Active tab updated
      if (onTabActive && nextTab !== activeTab) {
        onTabActive(nextTab);
      }
    });
  }

  function onGestureEvent({nativeEvent}: any) {
    if (tabs.length > 1 && itemLayout) {
      const {translationX} = nativeEvent;
      const newOffset = itemLayout.width - translationX;

      if (!shouldAllowSwipe(translationX)) {
        return;
      }

      scrollOffset.setValue(newOffset);
    }
  }

  function onLayout({nativeEvent}: any) {
    // calculate container's layout
    const {layout} = nativeEvent;
    setItemLayout(layout);
    const offset = tabs.length === 1 ? 0 : layout.width;
    scrollOffset.setValue(offset);
  }

  function renderItem(index: number) {
    // display tabs only when container's Layout is calculated above
    if (!itemLayout) {
      return <React.Fragment />;
    }

    const style = {
      ...itemLayout,
      top: 0,
      right: scrollOffset,
    };

    return (
      <Animated.View style={style}>{renderTab(tabs[index])}</Animated.View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <PanGestureHandler
        enabled={tabs.length > 1}
        onGestureEvent={onGestureEvent}
        onCancelled={onReleasePan}
        onEnded={onReleasePan}
        onFailed={onReleasePan}>
        <View style={styles.body} onLayout={onLayout}>
          {tabs.length > 1 && renderItem(indexLeft)}
          {renderItem(activeTabIndex)}
          {tabs.length > 1 && renderItem(indexRight)}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CircularTabView;
