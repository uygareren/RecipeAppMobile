import { TextStyle, ViewStyle } from "react-native";
import { BLACK_COLOR, MAIN_COLOR, PINK, TEXT_BLACK, WHITE } from "../utils/utils";


export const authButtonContainer:ViewStyle = {
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    marginTop: 20,
    backgroundColor: PINK, 
    borderRadius: 25,
    paddingVertical: 12,
    width: "40%",
};

export const authTextButton:TextStyle = {
    fontSize: 16,
    fontWeight: "500",
    color: WHITE
}

export const ingredientSaveButtonContainer:ViewStyle = {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: MAIN_COLOR,
}

export const ingredientSaveButtonText:TextStyle = {
    fontWeight: "bold", 
    color: TEXT_BLACK
}

export const ingredientPostButtonContainer:ViewStyle = {
    borderWidth: 1,
    borderColor: BLACK_COLOR,
    marginVertical: 25,
    paddingHorizontal:25,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: BLACK_COLOR,
    width: "40%",

}

export const ingredientPostButtonText:TextStyle = {
    color: MAIN_COLOR, 
    fontWeight: "bold", 
    fontSize: 16
}