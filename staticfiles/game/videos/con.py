import subprocess
import sys
import os

def convert_to_mp4(input_file, output_file=None):
    if output_file is None:
        base, _ = os.path.splitext(input_file)
        output_file = base + "_converted.mp4"

    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-c:v", "libx264",       # video codec H.264
        "-pix_fmt", "yuv420p",   # pixel format for max compatibility
        "-c:a", "aac",           # audio codec AAC
        "-b:a", "192k",          # audio bitrate
        "-movflags", "+faststart", # allows faster playback start
        output_file
    ]

    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True)
    print(f"✅ Converted MP4 saved as: {output_file}")


def convert_to_webm(input_file, output_file=None):
    if output_file is None:
        base, _ = os.path.splitext(input_file)
        output_file = base + ".webm"

    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-c:v", "libvpx-vp9",   # VP9 video codec
        "-b:v", "1M",           # video bitrate
        "-c:a", "libopus",      # Opus audio codec
        output_file
    ]

    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True)
    print(f"✅ Converted WebM saved as: {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_video.py input.mp4")
        sys.exit(1)

    input_file = sys.argv[1]
    convert_to_mp4(input_file)   # Always make MP4
    convert_to_webm(input_file)  # Optional: WebM too
