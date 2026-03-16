import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListBlog from './src/components/ListBlog';
import { useFonts } from 'expo-font';


export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />
      <View style={styles.header}>
        <Text style={styles.title}>WOCO.</Text>
        <Bell color={colors.black()} size={24} />
      </View>
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ ...category.item, marginLeft: 24 }}>
            <Text style={{ ...category.title, color: colors.blue() }}>
              Popular
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Latest</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Technology</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Fashion</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Health</Text>
          </View>
          <View style={{ ...category.item, marginRight: 24 }}>
            <Text style={category.title}>Lifestyle</Text>
          </View>
        </ScrollView>
      </View>
      <ListBlog styles={styles} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    shadowColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.white(),
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pjs-ExtraBold',
    color: colors.black(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    marginHorizontal: 5
  },
  title: {
    fontFamily: 'Pjs-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});


