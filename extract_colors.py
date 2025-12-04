import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image
except ImportError:
    print("Pillow not found. Installing...")
    install("Pillow")
    from PIL import Image

from collections import Counter

def get_dominant_colors(image_path, num_colors=3):
    try:
        image = Image.open(image_path)
        image = image.resize((150, 150))  # Resize for faster processing
        image = image.convert('RGB')
        pixels = list(image.getdata())
        counts = Counter(pixels)
        dominant = counts.most_common(num_colors)
        return [color for color, count in dominant]
    except Exception as e:
        print(f"Error: {e}")
        return []

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

if __name__ == "__main__":
    image_path = "veer logo .jpg"
    colors = get_dominant_colors(image_path)
    if colors:
        print("Dominant Colors:")
        for i, color in enumerate(colors):
            hex_color = rgb_to_hex(color)
            print(f"Color {i+1}: {hex_color} (RGB: {color})")
    else:
        print("Could not extract colors.")
