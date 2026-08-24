package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme =
  darkColorScheme(
    primary = SkyBlue400,
    onPrimary = Slate900,
    primaryContainer = SkyBlue700,
    onPrimaryContainer = Color.White,
    secondary = Orange500,
    onSecondary = Slate900,
    tertiary = Emerald500,
    background = BackgroundDark,
    surface = SurfaceDark,
    surfaceVariant = SurfaceVariantDark,
    onBackground = TextPrimaryDark,
    onSurface = TextPrimaryDark,
    outline = OutlineDark,
  )

private val LightColorScheme =
  lightColorScheme(
    primary = SkyBlue500,
    onPrimary = Color.White,
    primaryContainer = SkyBlue50,
    onPrimaryContainer = SkyBlue700,
    secondary = Orange500,
    onSecondary = Color.White,
    tertiary = Emerald600,
    background = BackgroundLight,
    surface = SurfaceLight,
    surfaceVariant = SurfaceVariantLight,
    onBackground = TextPrimaryLight,
    onSurface = TextPrimaryLight,
    outline = OutlineLight,
  )

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = false,
  content: @Composable () -> Unit,
) {
  val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
