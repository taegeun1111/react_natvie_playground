import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ISelectedAlbum } from "./useGallery";

interface MyDropdownPickerProps {
  onPressHeader: () => void;
  isDropdownOpen: boolean;
  selectedAlbum: ISelectedAlbum;
  onPressAddAlbum: () => void;
  albums: ISelectedAlbum[];
  onPressAlbum: (album: ISelectedAlbum) => void;
  onLongPressAlbum: (albumId: number) => void;
}

const headerHeight = 50;

export default ({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
  onLongPressAlbum,
}: MyDropdownPickerProps) => {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity
        onPress={onPressHeader}
        style={styles.container}
        activeOpacity={1}
      >
        <Text style={styles.title}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-down" : "arrow-up"}
          size={12}
          color="#404040"
          style={styles.arrow}
        />

        <TouchableOpacity style={styles.button} onPress={onPressAddAlbum}>
          <Text style={styles.text}>앨범추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {albums.map((list) => {
            const isSelectedAlbum = list.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                key={list.id}
                activeOpacity={1}
                onPress={() => onPressAlbum(list)}
                onLongPress={() => onLongPressAlbum(list.id)}
                style={styles.album}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {list.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
  },
  container: {
    height: headerHeight,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  arrow: {
    marginLeft: 8,
  },
  title: {
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    right: 0,
    height: headerHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
  },
  dropdown: {
    width: "100%",
    position: "absolute",
    top: headerHeight,
    borderTopColor: "lightgrey",
    borderTopWidth: 0.5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  album: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
