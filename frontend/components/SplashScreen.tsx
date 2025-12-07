import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

export default function SplashScreen({ onSignup, onLogin }: SplashScreenProps) {
  const card1Opacity = useRef(new Animated.Value(0)).current;
  const card2Opacity = useRef(new Animated.Value(0)).current;
  const card3Opacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const particlesOpacity = useRef(new Animated.Value(0)).current;
  const buttonsY = useRef(new Animated.Value(100)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  const card1Position = useRef(new Animated.Value(0)).current;
  const card3Position = useRef(new Animated.Value(0)).current;
  const card1Rotate = useRef(new Animated.Value(-5)).current;
  const card3Rotate = useRef(new Animated.Value(5)).current;
  const card1Scale = useRef(new Animated.Value(0.7)).current;
  const card2Scale = useRef(new Animated.Value(0.7)).current;
  const card3Scale = useRef(new Animated.Value(0.7)).current;
  const card1Y = useRef(new Animated.Value(0)).current;
  const card2Y = useRef(new Animated.Value(0)).current;
  const card3Y = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(40)).current;
  const titleScale = useRef(new Animated.Value(0.9)).current;

  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle1, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(particle1, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle2, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(particle2, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle3, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(particle3, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.sequence([
      Animated.stagger(200, [
        Animated.parallel([
          Animated.timing(card1Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(card1Scale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(card2Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(card2Scale, {
            toValue: 1.1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(card3Opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(card3Scale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]),

      Animated.parallel([
        Animated.spring(card1Position, {
          toValue: -110,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card3Position, {
          toValue: 110,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card1Rotate, {
          toValue: -12,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card3Rotate, {
          toValue: 12,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card1Y, {
          toValue: -10,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card2Y, {
          toValue: -15,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(card3Y, {
          toValue: -10,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(particlesOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(titleY, {
          toValue: 0,
          friction: 6,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 6,
          tension: 35,
          useNativeDriver: true,
        }),
      ]),

      // Apparition des boutons
      Animated.parallel([
        Animated.spring(buttonsY, {
          toValue: 0,
          friction: 6,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={["#ffffff", "#fef3f0", "#f8f0ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Particules flottantes */}
      <Animated.View
        style={[
          styles.particle,
          {
            left: width * 0.2,
            top: height * 0.25,
            opacity: particlesOpacity,
            transform: [
              {
                translateX: particle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
              {
                translateY: particle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["#ff6b35", "transparent"]}
          style={styles.particleDot}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          {
            right: width * 0.25,
            top: height * 0.3,
            opacity: particlesOpacity,
            transform: [
              {
                translateX: particle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -25],
                }),
              },
              {
                translateY: particle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 35],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["#f94144", "transparent"]}
          style={[styles.particleDot, { width: 8, height: 8 }]}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Container des cartes */}
        <View style={styles.cardsContainer}>
          {/* Carte 1 - Orange */}
          <Animated.View
            style={[
              styles.cardWrapper,
              {
                opacity: card1Opacity,
                transform: [
                  { translateX: card1Position },
                  { translateY: card1Y },
                  {
                    rotate: card1Rotate.interpolate({
                      inputRange: [-12, -5],
                      outputRange: ["-12deg", "-5deg"],
                    }),
                  },
                  { scale: card1Scale },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#ff6b35", "#ff8c42"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.3)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardShine}
              />
              <View style={styles.cardLine} />
              <View style={[styles.cardLine, styles.cardLineShort]} />
              <View style={[styles.cardLine, styles.cardLineShorter]} />
              <LinearGradient
                colors={["rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"]}
                style={styles.badge}
              >
                <Text style={styles.badgeIcon}>✓</Text>
              </LinearGradient>
            </LinearGradient>
          </Animated.View>

          {/* Carte 2 - Rouge */}
          <Animated.View
            style={[
              styles.cardWrapper,
              {
                opacity: card2Opacity,
                zIndex: 3,
                transform: [{ translateY: card2Y }, { scale: card2Scale }],
              },
            ]}
          >
            <LinearGradient
              colors={["#f94144", "#f3722c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, styles.cardCenter]}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.35)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardShine}
              />
              <View style={styles.cardLine} />
              <View style={[styles.cardLine, styles.cardLineShort]} />
              <View style={[styles.cardLine, styles.cardLineShorter]} />
              <LinearGradient
                colors={["rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"]}
                style={styles.badge}
              >
                <Text style={styles.badgeIcon}>★</Text>
              </LinearGradient>
            </LinearGradient>
          </Animated.View>

          {/* Carte 3 - Violet */}
          <Animated.View
            style={[
              styles.cardWrapper,
              {
                opacity: card3Opacity,
                transform: [
                  { translateX: card3Position },
                  { translateY: card3Y },
                  {
                    rotate: card3Rotate.interpolate({
                      inputRange: [5, 12],
                      outputRange: ["5deg", "12deg"],
                    }),
                  },
                  { scale: card3Scale },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#9d4edd", "#7209b7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.3)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardShine}
              />
              <View style={styles.cardLine} />
              <View style={[styles.cardLine, styles.cardLineShort]} />
              <View style={[styles.cardLine, styles.cardLineShorter]} />
              <LinearGradient
                colors={["rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"]}
                style={styles.badge}
              >
                <Text style={styles.badgeIcon}>♥</Text>
              </LinearGradient>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Titre */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleY }, { scale: titleScale }],
            },
          ]}
        >
          <LinearGradient
            colors={["#ff6b35", "#f94144", "#9d4edd"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleWrapper}
          >
            <Text style={styles.title}>TaskFlow</Text>
          </LinearGradient>
          <Text style={styles.subtitle}>
            Organisez votre quotidien avec style ✨
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            opacity: buttonsOpacity,
            transform: [{ translateY: buttonsY }],
          },
        ]}
      >
        {Platform.OS === "ios" ? (
          <BlurView intensity={80} tint="light" style={styles.blurContainer}>
            <BottomSheetContent onSignup={onSignup} onLogin={onLogin} />
          </BlurView>
        ) : (
          <LinearGradient
            colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.98)"]}
            style={styles.blurContainer}
          >
            <BottomSheetContent onSignup={onSignup} onLogin={onLogin} />
          </LinearGradient>
        )}
      </Animated.View>
    </LinearGradient>
  );
}

interface BottomSheetContentProps {
  onSignup: () => void;
  onLogin: () => void;
}

function BottomSheetContent({ onSignup, onLogin }: BottomSheetContentProps) {
  return (
    <>
      {/* Indicateur de drag */}
      <LinearGradient
        colors={["#ff6b35", "#f94144", "#9d4edd"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.dragIndicator}
      />

      {/* Bouton Inscription */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={onSignup}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#ff6b35", "#f94144", "#f3722c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signupButton}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.2)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonShine}
          />
          <Text style={styles.signupButtonText}>Créer un compte</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bouton Connexion */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={onLogin}
        activeOpacity={0.8}
      >
        <View style={styles.loginButton}>
          <LinearGradient
            colors={["#ff6b35", "#f94144", "#9d4edd"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButtonBorder}
          />
          <View style={styles.loginButtonInner}>
            <Text style={styles.loginButtonText}>Se connecter</Text>
            <Text style={styles.loginButtonIcon}>✦</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Texte légal */}
      <Text style={styles.legalText}>
        En continuant, vous acceptez nos conditions d'utilisation
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    height: 220,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  cardWrapper: {
    position: "absolute",
  },
  card: {
    width: 160,
    height: 200,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
    overflow: "hidden",
  },
  cardCenter: {
    shadowColor: "#f94144",
    shadowOpacity: 0.4,
  },
  cardShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  cardLine: {
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    marginBottom: 14,
  },
  cardLineShort: {
    width: "75%",
  },
  cardLineShorter: {
    width: "55%",
  },
  badge: {
    position: "absolute",
    bottom: 18,
    right: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeIcon: {
    fontSize: 18,
    color: "#fff",
  },
  particle: {
    position: "absolute",
  },
  particleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleWrapper: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 56,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
    textShadowColor: "rgba(249, 65, 68, 0.2)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#1e293b",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 12,
    opacity: 0.8,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  blurContainer: {
    padding: 30,
    paddingBottom: Platform.OS === "ios" ? 50 : 30,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 30,
    opacity: 0.3,
  },
  buttonWrapper: {
    marginBottom: 16,
  },
  signupButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#f94144",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    overflow: "hidden",
  },
  buttonShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginRight: 8,
  },
  buttonArrow: {
    fontSize: 20,
    color: "#ffffff",
  },
  loginButton: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
  },
  loginButtonBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loginButtonInner: {
    margin: 2,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginRight: 8,
  },
  loginButtonIcon: {
    fontSize: 20,
    color: "#1e293b",
  },
  legalText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    marginTop: 24,
    fontWeight: "500",
  },
});
