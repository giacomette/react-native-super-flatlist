import React, { useRef, useCallback, useMemo } from 'react';
import {
  FlatList as FlatListRN,
  ActivityIndicator,
  FlatListProps as FlatListPropsRN,
  StyleSheet,
  View,
} from 'react-native';

interface FlatListProps<T = any> extends FlatListPropsRN<T> {
  isLoadingStart?: boolean;
  isLoadingEnd?: boolean;
  hasMoreStart?: boolean;
  hasMoreEnd?: boolean;
  activityIndicatorColor?: string;
  onStartReached?: () => void;
  onEndReached?: () => void;
  data: T[];
}

export default function FlatList({
  data = [],
  isLoadingEnd,
  isLoadingStart,
  hasMoreStart,
  hasMoreEnd,
  onStartReached,
  onEndReached,
  activityIndicatorColor,
  ...props
}: FlatListProps) {
  const loading = useRef(false);
  const itemsHeight = useRef<number[]>([]);

  const _onStartReached = useCallback(() => {
    if (
      hasMoreStart &&
      !isLoadingStart &&
      !loading.current &&
      typeof onStartReached === 'function'
    ) {
      loading.current = true;

      onStartReached();

      setTimeout(() => (loading.current = false), 500);
    }
  }, [hasMoreStart, isLoadingStart, onStartReached]);

  const _onEndReached = useCallback(
    (event: any) => {
      if (
        hasMoreEnd &&
        !isLoadingEnd &&
        !loading.current &&
        typeof onEndReached === 'function' &&
        event.nativeEvent.contentOffset.y <= 40
      ) {
        loading.current = true;

        onEndReached();

        setTimeout(() => (loading.current = false), 500);
      }
    },
    [hasMoreEnd, isLoadingEnd, onEndReached]
  );

  const items = useMemo(() => [...data].reverse(), [data]);

  return (
    <FlatListRN
      {...props}
      renderItem={(result) => (
        <View
          key={result.index}
          onLayout={(ev) =>
            (itemsHeight.current[result.index] = ev.nativeEvent.layout.height)
          }
        >
          {typeof props.renderItem === 'function'
            ? props.renderItem(result)
            : null}
        </View>
      )}
      data={items ?? []}
      onMomentumScrollEnd={_onEndReached}
      onEndReached={_onStartReached}
      onEndReachedThreshold={0.5}
      inverted
      ListFooterComponent={
        isLoadingStart ? (
          <ActivityIndicator
            style={styles.loading}
            color={activityIndicatorColor ?? '#000'}
            size="large"
          />
        ) : null
      }
      ListHeaderComponent={
        isLoadingEnd ? (
          <ActivityIndicator
            style={styles.loading}
            color={activityIndicatorColor ?? '#000'}
            size="large"
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: 16,
  },
});
