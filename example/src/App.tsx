/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import SuperFlatlist from 'react-native-super-flatlist';

const PER_PAGE = 5;

const fakePrev = [
  {
    id: 1,
    createdAt: '2021-05-28T14:06:55-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 2,
    createdAt: '2021-05-28T14:10:41-04:00',
    files: [],
    sendBy: {
      name: 'annna',
    },
  },
  {
    id: 3,
    createdAt: '2021-05-28T14:27:56-04:00',
    files: [],
    sendBy: {
      name: 'Roberto Giacomette',
    },
  },
  {
    id: 4,
    createdAt: '2021-05-28T14:28:54-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 5,
    createdAt: '2021-05-28T14:34:58-04:00',
    files: [],
    sendBy: {
      name: 'Ronan Strobel',
    },
  },
  {
    id: 6,
    createdAt: '2021-05-28T14:39:22-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 7,
    createdAt: '2021-05-28T14:40:41-04:00',
    files: [],
    sendBy: {
      name: 'Ronan Strobel',
    },
  },
  {
    id: 8,
    createdAt: '2021-05-28T14:46:51-04:00',
    files: [],
    sendBy: {
      name: 'Gabriel Santos',
    },
  },
  {
    id: 9,
    createdAt: '2021-05-28T14:47:20-04:00',
    files: [],
    sendBy: {
      name: 'annna',
    },
  },
  {
    id: 10,
    createdAt: '2021-05-28T14:49:24-04:00',
    files: [],
    sendBy: {
      name: 'annna',
    },
  },
  {
    id: 11,
    createdAt: '2021-05-28T14:56:05-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 12,
    createdAt: '2021-05-28T14:56:29-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 13,
    createdAt: '2021-05-28T14:56:50-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 14,
    createdAt: '2021-05-28T14:56:54-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 15,
    createdAt: '2021-05-28T14:56:58-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
];

const fakeNext = [
  {
    id: 16,
    createdAt: '2021-05-28T14:57:01-04:00',
    files: [],
    sendBy: {
      name: 'Elvis Fabian',
    },
  },
  {
    id: 17,
    createdAt: '2021-05-28T15:04:03-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 18,
    createdAt: '2021-05-28T15:18:03-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 19,
    createdAt: '2021-05-28T18:00:18-04:00',
    files: [],
    sendBy: {
      name: 'Usuário Teste Apple',
    },
  },
  {
    id: 20,
    createdAt: '2021-05-28T18:03:05-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 21,
    createdAt: '2021-05-28T18:08:48-04:00',
    files: [],
    sendBy: {
      name: 'Flavio Greter',
    },
  },
  {
    id: 22,
    createdAt: '2021-05-28T19:42:33-04:00',
    files: [],
    sendBy: {
      name: 'Gabriel Santos',
    },
  },
  {
    id: 23,
    createdAt: '2021-05-28T23:38:54-04:00',
    files: [],
    sendBy: {
      name: 'Roberto Giacomette',
    },
  },
  {
    id: 24,
    createdAt: '2021-05-28T23:55:19-04:00',
    files: [],
    sendBy: {
      name: 'Roberto Giacomette',
    },
  },
  {
    id: 25,
    createdAt: '2021-05-29T06:30:18-04:00',
    files: [],
    sendBy: {
      name: 'AgroSIG',
    },
  },
];

export default function App() {
  const [data, setData] = React.useState<any[]>(fakePrev.slice(PER_PAGE * -1));
  const [isLoadingPrev, setIsLoadingPrev] = React.useState<boolean>(false);
  const [isLoadingNext, setIsLoadingNext] = React.useState<boolean>(false);
  const [pagePrev, setPagePrev] = React.useState<number>(1);
  const [pageNext, setPageNext] = React.useState<number>(0);

  const handleMorePrev = () => {
    setIsLoadingPrev(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = fakePrev.slice(
          PER_PAGE * (pagePrev + 1) * -1,
          PER_PAGE * pagePrev * -1
        );

        if (!result.length) {
          resolve(true);
          setIsLoadingPrev(false);
          return;
        }

        setPagePrev((prev) => prev + 1);
        setData((prev) => [...result, ...prev]);
        resolve(true);
        setIsLoadingPrev(false);
      }, 500);
    });
  };

  const handleMoreNext = () => {
    setIsLoadingNext(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = fakeNext.slice(
          PER_PAGE * pageNext,
          PER_PAGE * (pageNext + 1)
        );

        if (!result.length) {
          resolve(true);
          setIsLoadingNext(false);
          return;
        }

        setPageNext((prev) => prev + 1);
        setData((prev) => [...prev, ...result]);
        resolve(true);
        setIsLoadingNext(false);
      }, 2500);
    });
  };

  return (
    <View style={styles.container}>
      <SuperFlatlist
        data={data}
        isLoadingEnd={isLoadingNext}
        isLoadingStart={isLoadingPrev}
        onStartReached={() => handleMorePrev()}
        onEndReached={() => handleMoreNext()}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              height: 260 + Math.random() * index,
              marginHorizontal: 16,
              marginTop: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {item.id} - {item.sendBy.name}
            </Text>
            <Text style={{ fontSize: 18 }}>{item.createdAt}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
