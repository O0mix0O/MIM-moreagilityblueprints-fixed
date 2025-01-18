# Melvor Idle UI Blur Mod

This mod adds a blur effect to the game's main content and skill footer when a specific modal is visible. The blur effect is removed once the modal is no longer displayed.

## Features

- **Adds blur**: When the `Welcome Back!` modal (swal2-container) appears, it applies a `filter: blur(5px)` to the `#page-container` and `#skill-footer-minibar-container` elements.
- **Removes blur**: Once the `Welcome Back!` modal disappears, the blur effect is removed.

## How It Works

- **Modal Visibility Detection**: The mod uses JavaScript to monitor the visibility of the `Welcome Back!` modal. When the modal becomes visible, the blur effect is applied to the main game content. The blur is removed when the modal is no longer visible.

## Acknowledgments

- Thanks to the Melvor Idle community for supporting modding and making this mod possible!