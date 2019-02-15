import { AsyncStorage, Dimensions, Platform, Linking, NativeModules } from "react-native";
import Languages from "../config/Languages";

const { width, height } = Dimensions.get("window");

class Tools {

    getMetrics() {
        const metrics = {
            screenWidth: width < height ? width : height,
            screenHeight: width < height ? height : width,
            navBarHeight: Platform.OS === "ios" ? 54 : 66
        };
        return metrics;
    }

    getStrings() {
        const l = this.getLanguage();
        return Languages[l];
    }

    getLanguage() {
        let systemLanguage = "en";
        if (Platform.OS === "android") {
            systemLanguage = NativeModules.I18nManager.localeIdentifier;
        } else {
            systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
        }
        return systemLanguage.substring(0, 2);
    }


}

export default new Tools();