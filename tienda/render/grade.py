import sys, numpy as np
from PIL import Image, ImageFilter
def grade(src, dst, w, h, vig=0.26, grain=1.6, warm=1.0):
    im = Image.open(src).convert('RGB')
    if im.size != (w, h): im = im.resize((w, h), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255.0
    lum = (a @ np.array([0.2126, 0.7152, 0.0722], np.float32))[..., None]
    # gentle S-curve
    s = a * a * (3 - 2 * a); a = a * 0.82 + s * 0.18
    # split tone: cool shadows, warm highlights
    sh = (1 - lum) ** 3; hi = lum ** 2
    a += sh * np.array([-0.010, 0.002, 0.014]) * warm + hi * np.array([0.018, 0.006, -0.012]) * warm
    # vignette
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2) / np.sqrt(2)
    a *= (1 - vig * np.clip(r, 0, 1) ** 2.2)[..., None]
    # film grain (luma), stronger in mids
    rng = np.random.default_rng(1)
    n = rng.normal(0, grain / 255.0, (h, w, 1)).astype(np.float32)
    a += n * (0.5 + 0.5 * (1 - np.abs(lum - 0.5) * 2))
    out = Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))
    out = out.filter(ImageFilter.UnsharpMask(radius=1.1, percent=70, threshold=2))
    out.save(dst, quality=92, optimize=True, progressive=True) if dst.endswith('.jpg') else out.save(dst)
if __name__ == '__main__':
    src, dst, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    grade(src, dst, w, h)
