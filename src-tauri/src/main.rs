#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod xiang;

fn main() {
  tauri::Builder::default()
    .setup(xiang::setup::init)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
