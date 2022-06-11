use tauri::{App, Manager};

#[cfg(target_os = "macos")]
use window_vibrancy::{NSVisualEffectMaterial};

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("main").unwrap();


    // we perform the initialization code on a new task so the app doesn't freeze
    tauri::async_runtime::spawn(async move {
    // initialize your app here instead of sleeping :)

        #[cfg(target_os = "macos")]
        window_vibrancy::apply_vibrancy(&win, NSVisualEffectMaterial::FullScreenUI)
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        #[cfg(target_os = "windows")]
        window_vibrancy::apply_blur(&win, Some((18, 18, 18, 125)))
            .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

        // After it's done, close the splashscreen and display the main window
        win.show().unwrap();
    });
    Ok(())
}
