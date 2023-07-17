import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation
} from 'react-native-draggable-flatlist';

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';


export default function App() {
  console.log('darg-drop')
  const ref = useRef(null);
  const [data, setData] = useState([
    {
      key: '1',
      label: 'Row 1',
      height: 100,
      backgroundColor: '#FFF',
      isSelected: false
    },
    {
      key: '2',
      label: 'Row 2',
      height: 100,
      backgroundColor: '#FFF',
      isSelected: false,
    },
    {
      key: '3',
      label: 'Row 3',
      height: 100,
      backgroundColor: '#FFF',
      isSelected: false,
    },
    {
      key: '4',
      label: 'Row 4',
      height: 100,
      backgroundColor: '#FFF',
      isSelected: false,
    },
    {
      key: '5',
      label: 'Row 5',
      height: 100,
      backgroundColor: '#FFF',
      isSelected: false,
    },
  ]);

  const onPress = (ind) => {
    console.log(ind);
    const tempData = [];
    data.map((item, index) => {
      if (item.key == ind) {
        if (item.isSelected) {
          item.isSelected = false;
          tempData.push(item)
        } else {
          item.isSelected = true;
          tempData.push(item)
        }
      } else {
        tempData.push(item)
        // if(item.isSelected){
        //   tempData.push(item)
        // } else {
        //   tempData.push(item)
        // }
       
      }
    })
    setData(tempData)
    console.log('TempData')
    console.log(tempData)
  }

  const renderItem = ({ item, drag }) => {
    const { isActive } = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              onPress={() => onPress(item.key)}
              activeOpacity={1}
              style={[
                styles.rowItem,
                {
                  height: item.height,
                  backgroundColor: item.backgroundColor,
                  elevation: isActive ? 30 : 0,
                  backgroundColor: item.isSelected ? 'green' : 'white'
                }
              ]}
            >
              <Animated.View>
                <Text style={styles.text}>
                  {item.label}
                </Text>
              </Animated.View>


            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    )
  }
  console.log(data)
  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  }
});
