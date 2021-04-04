import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../../shared/colors";
import ChatList from "../../../components/app/main/ChatList";

const ChatListScreen = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const header = (
    <TouchableOpacity style={styles.searchContainer} activeOpacity={0.6}>
      <Ionicons
        name={Platform.OS === "android" ? "md-search" : "ios-search"}
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name"
        value={searchInput}
        onChangeText={setSearchInput}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <ChatList
        header={header}
        navigation={props.navigation}
        data={[
          {
            id: "1",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "2",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
          {
            id: "3",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "4",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
          {
            id: "5",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "6",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
          {
            id: "7",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "8",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
          {
            id: "9",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "10",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
          {
            id: "11",
            title: "ริวน้อยคอยรัก",
            subtitle: "You: งานเดินวะ • 2:29 PM",
            imageUrl:
              "https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.0-1/p200x200/82619861_2684367131652295_8830353860364075008_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFq09TmACKlVx-AlXB4koQluw6dQB-mQYS7Dp1AH6ZBhAJDEWmK-OlfELVA-HGT-WRtRwfI2Y5IadHXJ8Gx-1QE&_nc_ohc=NhJ5AD68cu0AX9_Jo8X&_nc_ht=scontent.fbkk12-4.fna&tp=6&oh=6bcecabc606e807036b29519d0581d82&oe=6071E6BE",
          },
          {
            id: "12",
            title: "Visarut Phanmaisri",
            subtitle: "You: ให้กดได้จากโพสดีกว่าป่ะ • 6:03 PM",
            imageUrl:
              "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p200x200/74224177_2549166801787867_6417871340086231040_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGe3pTVpXQoq0UhQLD5KoJsYosXjaciiqxiixeNpyKKrP7dZGlaG9Bps-C3oBQuzikbSP29iTe6CH77GwlNcmBK&_nc_ohc=W5W86qO6tKAAX89x6Rt&_nc_ht=scontent.fbkk12-2.fna&tp=6&oh=e56a7bee937331014d78a5d72f1634af&oe=6072B8E9",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 16,
    paddingLeft: 10,
  },
});

export const screenOptions = {
  headerShown: false,
};

export default ChatListScreen;
