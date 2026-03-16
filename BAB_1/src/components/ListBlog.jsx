import { ScrollView, View, StyleSheet, Text,ImageBackground,Image,} from "react-native";
import { colors } from "../../assets/theme";
import { ReceiptText, Clock, MessageCircle,Bookmark } from "lucide-react-native";

export default function ListBlog({styles}) {
    return (
      <ScrollView>
        <View style={styles.listBlog}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ gap: 15 }}
          >
            <View style={{ ...itemHorizontal.cardItem, marginLeft: 24 }}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
                }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      Exploring the World of Electric Cars
                    </Text>
                    <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
                  </View>
                  <View>
                    <View style={itemHorizontal.cardIcon}>
                      <Bookmark
                        color={colors.white()}
                        variant="Linear"
                        size={20}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={itemHorizontal.cardItem}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1574770118700-4ed7dae3310e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      Exploring the World of Electric Cars
                    </Text>
                    <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
                  </View>
                  <View>
                    <View style={itemHorizontal.cardIcon}>
                      <Bookmark
                        color={colors.white()}
                        variant="Linear"
                        size={20}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={itemHorizontal.cardItem}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      Exploring the World of Electric Cars
                    </Text>
                    <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
                  </View>
                  <View>
                    <View style={itemHorizontal.cardIcon}>
                      <Bookmark
                        color={colors.white()}
                        variant="Linear"
                        size={20}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={itemHorizontal.cardItem}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1577048982768-5cb3e7ddfa23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
                }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      Baking 101: Mastering the Art of Baking
                    </Text>
                    <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
                  </View>
                  <View>
                    <View style={itemHorizontal.cardIcon}>
                      <Bookmark
                        color={colors.white()}
                        variant="Linear"
                        size={20}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={{ ...itemHorizontal.cardItem, marginRight: 24 }}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
                }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      Rediscovering Vinyl: The Resurgence of Analog
                    </Text>
                    <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
                  </View>
                  <View>
                    <View style={itemHorizontal.cardIcon}>
                      <Bookmark
                        color={colors.white()}
                        variant="Linear"
                        size={20}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
          <View style={itemVertical.listCard}>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Technology</Text>
                    <Text style={itemVertical.cardTitle}>
                      How to use Redux in ReactJS
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Technology</Text>
                    <Text style={itemVertical.cardTitle}>
                      Boosting Traffic with SEO
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1492683962492-deef0ec456c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1756&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Food</Text>
                    <Text style={itemVertical.cardTitle}>
                      Culinary Adventures: Exploring Exotic Flavors
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Fashion</Text>
                    <Text style={itemVertical.cardTitle}>Sneaker Culture</Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Lifestyle</Text>
                    <Text style={itemVertical.cardTitle}>
                      Balancing Work and Well-being
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Health</Text>
                    <Text style={itemVertical.cardTitle}>
                      Home Fitness Revolution
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
            <View style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                }}
              />
              <View style={itemVertical.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>Fashion</Text>
                    <Text style={itemVertical.cardTitle}>
                      Intersection of Fashion
                    </Text>
                  </View>
                  <ReceiptText color={colors.grey(0.6)} variant="Linear" size={20} />
                </View>
                <View style={itemVertical.cardInfo}>
                  <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                  <MessageCircle size={10} variant="Linear" color={colors.grey(0.6)} />
                  <Text style={itemVertical.cardText}>89</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const itemVertical = StyleSheet.create({
    listCard: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 15,
    },
    cardItem: {
      backgroundColor: colors.blue(0.03),
      flexDirection: "row",
      borderRadius: 10,
    },
    cardCategory: {
      color: colors.blue(),
      fontSize: 10,
      fontFamily: "Pjs-SemiBold",
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: "Pjs-Bold",
      color: colors.black(),
    },
    cardText: {
      fontSize: 10,
      fontFamily: "Pjs-Medium",
      color: colors.blue(0.6),
    },
    cardImage: {
      width: 94,
      height: 94,
      borderRadius: 10,
      resizeMode: "cover",
    },
    cardInfo: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    cardContent: {
      gap: 10,
      justifyContent: "space-between",
      paddingRight: 10,
      paddingLeft: 15,
      flex: 1,
      paddingVertical: 10,
    },
  });
  const itemHorizontal = StyleSheet.create({
    cardItem: {
      width: 280,
    },
    cardImage: {
      width: "100%",
      height: 200,
      borderRadius: 5,
    },
    cardContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
    },
    cardInfo: {
      justifyContent: "flex-end",
      height: "100%",
      gap: 10,
      maxWidth: "60%",
    },
    cardTitle: {
      fontFamily: "Pjs-Bold",
      fontSize: 14,
      color: colors.white(),
    },
    cardText: {
      fontSize: 10,
      color: colors.white(),
      fontFamily: "Pjs-Medium",
    },
    cardIcon: {
      backgroundColor: colors.white(0.33),
      padding: 5,
      borderColor: colors.white(),
      borderWidth: 0.5,
      borderRadius: 5,
    },
  });
  