import os
from PIL import Image

def generate_icons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_path = os.path.join(base_dir, 'public', 'ubuntu-logomark.png')
    public_dir = os.path.join(base_dir, 'public')
    app_dir = os.path.join(base_dir, 'src', 'app')

    print(f"Loading source logomark from: {src_path}")
    img = Image.open(src_path)

    # The background orange color of ubuntu-logomark.png is (252, 98, 6)
    bg_color = (252, 98, 6)

    # The emblem center is around (731, 522), width ~1237, height ~845
    # A 1650x1650 canvas centers the emblem with proportional padding on all 4 sides
    square_size = 1650
    master_square = Image.new('RGB', (square_size, square_size), bg_color)
    offset_x = (square_size // 2) - 731
    offset_y = (square_size // 2) - 522
    master_square.paste(img, (offset_x, offset_y))

    # Sizes to generate
    sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'favicon-48x48.png': 48,
        'apple-touch-icon.png': 180,
        'android-chrome-192x192.png': 192,
        'android-chrome-512x512.png': 512,
    }

    resized_images = {}
    for filename, size in sizes.items():
        res = master_square.resize((size, size), Image.Resampling.LANCZOS)
        out_path = os.path.join(public_dir, filename)
        res.save(out_path, format='PNG', optimize=True)
        resized_images[size] = res
        print(f"Generated {out_path} ({size}x{size})")

    # Generate multi-size favicon.ico (16, 32, 48) for Next.js App Router (src/app/favicon.ico)
    ico_path_app = os.path.join(app_dir, 'favicon.ico')
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    master_square.save(ico_path_app, format='ICO', sizes=ico_sizes)
    print(f"Generated {ico_path_app}")

    # Next.js App Router convention icons in src/app/
    apple_icon_app = os.path.join(app_dir, 'apple-icon.png')
    resized_images[180].save(apple_icon_app, format='PNG', optimize=True)
    print(f"Generated {apple_icon_app}")

    icon_app = os.path.join(app_dir, 'icon.png')
    resized_images[512].save(icon_app, format='PNG', optimize=True)
    print(f"Generated {icon_app}")

if __name__ == '__main__':
    generate_icons()

