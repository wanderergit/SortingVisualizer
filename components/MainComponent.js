import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from '@react-native-community/slider';

const MainComponent = () => {
  const [algorithm, setAlgorithm] = useState('');
  const [arrSize, setArrSize] = useState(5);
  const [array, updateArray] = useState([2, 42, 18, 5, 67]);
  const [colorsArray, updateColorsArray] = useState(["#041820", "#041820", "#041820", "#041820", "#041820"]);

  const getUpdatedArray = (newSize) => {
    const arr = [];
    for (let i = 0; i < newSize; i += 1) {
      arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
  }

  const getUpdatedColorsArray = (newSize) => {
    const arr = [];
    for (let i = 0; i < newSize; i += 1) {
      arr.push("#041820");
    }
    return arr;
  }

  const processIJ = (a, i, j) => {
    let arr = [...a];
    // let cArr = [...colorsArray];
    // cArr[i] = "#EE5E85";
    // cArr[j] = "#EE5E85";
    // updateColorsArray([...cArr]);
    // console.log(`i is ${i} and j is ${j}`);
    if (arr[i] > arr[j]) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      setTimeout(() => {
        updateArray(arr);
      }, 200);
    }
    return arr;
  }

  const bubbleSort = () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = i + 1; j < arr.length; j += 1) {
        arr = processIJ(arr, i, j);
      }
    }
  }

  const whenSlide = (newSize) => {
    const updatedArray = getUpdatedArray(newSize);
    updateArray(updatedArray)
    const updatedColorsArray = getUpdatedColorsArray(newSize);
    updateColorsArray(updatedColorsArray);
  }

  return (
    <PreviewLayout
      label='Sorting Visualizer'
      values={["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"]}
      selectedAlgo={algorithm}
      setSelectedAlgo={setAlgorithm}
      selectedArrSize={arrSize}
      setArrSizeValue={setArrSize}
      whenSlide={whenSlide}
      bubbleSort={bubbleSort}
    >
      <Text>{arrSize}</Text>
      {/* <Text>{array.toString()}</Text> */}
      <View style={styles.outerContainer}>
        {array.map((item) => (
          <View style={[styles.innerContainer, { height: item * 5, backgroundColor: colorsArray[array.indexOf(item)] }]} />
        ))}
      </View>
    </PreviewLayout >
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  selectedAlgo,
  setSelectedAlgo,
  selectedArrSize,
  setArrSizeValue,
  whenSlide,
  bubbleSort
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedAlgo(value)}
          style={[
            styles.button,
            selectedAlgo === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedAlgo === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.sliderRow}>
      <Text>arr[5]</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={5}
        maximumValue={100}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => {
          setArrSizeValue(Math.floor(value));
          whenSlide(Math.floor(value));
        }}
      />
      <Text>arr[100]</Text>
    </View>
    <View style={styles.sliderRow}>
      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => bubbleSort()}
      >
        <Text
          style={[
            styles.buttonLabel
          ]}
        >
          Sort
        </Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.container, { [label]: selectedAlgo }]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  outerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  innerContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#50BCC2"
  }
});

export default MainComponent
