# Profile Frontend — yangilangan versiya (About / Projects / Contact / Blog / Activities)

## Tuzilma

- **Bosh sahifa (`/`)** — faqat Navbar + Activites (so'nggi 30 kunlik faoliyat jadvali).
- **Navbar** — `Blog` linki va `More` tugmasi. `More` qattiq belgilangan
  3 element ko'rsatadi (admin orqali qo'shilmaydi/o'chirilmaydi):
  **About Me** (`/about`), **Projects** (`/projects`), **Contact** (`/contact`).
- **About Me** va **Projects** — bir xil uslubda: matn (paragraflar) +
  cheklanmagan sondagi rasm. Rasmlar va matn **frontend tomonidan**
  avtomatik tartibda joylashtiriladi: 1-paragraf → 1-rasm → 2-paragraf →
  2-rasm ... Agar rasm paragrafdan ko'p bo'lsa, qolganlari oxirida
  galereya bo'lib chiqadi. Bu mantiq `src/components/ContentRenderer.jsx`da.
- **Contact** — sarlavha "Ready to collaborate?", pastida oddiy xabar
  yuborish formasi (Ism, Email, Xabar) → `POST /contact/create/`.
  Hech qanday qo'shimcha maydon (telefon/manzil va h.k.) yo'q.
- **Blog** — ro'yxat va batafsil sahifa, xuddi About/Projects kabi matn +
  cheklanmagan rasm formatida.
- **Admin panel** (`/admin`) — 4 bo'lim: **Activities**, **About Me**,
  **Projects**, **Blog**. Har birida rasm galereyasi (bir nechta rasm
  birga yuklash, alohida o'chirish) va matn maydoni mavjud.
- Login sahifasi va admin panel umumiy dizaynga moslab chiroyli qilib
  qayta ishlandi (`src/styles/Form.css`, `src/styles/AdminControl.css`).
- Activites jadvalidagi katakchalarga hover qilganda endi silliq
  kattalashadi (oldingi "glitch" muammosi tuzatildi —
  `transform-origin: center` + cubic-bezier transition,
  `src/styles/ActivityHeatmap.css`).

## Backend (Django) — kerakli endpointlar

Siz yuborgan swagger ro'yxatiga ko'ra quyidagilar mavjud va frontend
aynan shularni ishlatadi (**Experience ishlatilmaydi**):

| Maqsad | Public (hammaga ko'rinadi) | Admin (JWT kerak) |
|---|---|---|
| About Me | `GET /api/dev/info/` | `GET/PATCH /api/admin-control/dev/`, `DELETE /api/admin-control/dev/images/<id>/` |
| Projects | `GET /api/dev/projects/` | `GET/PATCH /api/admin-control/projects/`, `DELETE /api/admin-control/projects/images/<id>/` |
| Blog | `GET /api/dev/blog/`, `GET /api/dev/blog/<slug>/` | `GET/POST /api/admin-control/blog/`, `PATCH/DELETE /api/admin-control/blog/<id>/`, `DELETE /api/admin-control/blog/<id>/images/<image_id>/` |
| Contact | — | `POST /contact/create/` (ommaviy, login kerak emas) |
| Auth | — | `POST /api/token/`, `POST /api/token/refresh/` |

### Javob formati — About Me / Projects

```json
{
  "content": "Birinchi paragraf...\nIkkinchi paragraf...",
  "images": [
    { "id": 1, "image": "https://.../media/about/1.jpg" },
    { "id": 2, "image": "https://.../media/about/2.jpg" }
  ]
}
```

`content` — har bir paragraf yangi qatordan (`\n`). `images` — tartib
bo'yicha qaytariladi (masalan `order`/`id` bo'yicha), soni cheklanmagan.

Admin **PATCH** so'rovi `multipart/form-data` ko'rinishida yuboriladi:
- `content` — matn
- `new_images` — bir nechta fayl (`FormData.append("new_images", file)`
  har bir rasm uchun alohida chaqiriladi)

Taklif etilgan Django modeli:
```python
class DevInfo(models.Model):
    content = models.TextField(blank=True)

class DevInfoImage(models.Model):
    dev_info = models.ForeignKey(DevInfo, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="about/")
    order = models.PositiveIntegerField(default=0)
```
(`Projects` uchun xuddi shu tuzilma, alohida model bilan.)

PATCH serializer logikasi: kelgan `new_images` fayllarini navbatdagi
`order` bilan qo'shib qo'yish, `content`ni yangilash. Rasmni o'chirish —
alohida endpoint: `DELETE /api/admin-control/dev/images/<id>/` /
`DELETE /api/admin-control/projects/images/<id>/`.

### Javob formati — Blog

```json
[
  { "id": 1, "title": "...", "slug": "...", "published_date": "2026-06-20" }
]
```
(ro'yxat — `GET /api/dev/blog/`)

```json
{
  "id": 1,
  "title": "...",
  "slug": "...",
  "content": "Paragraf 1\nParagraf 2",
  "published_date": "2026-06-20",
  "images": [{ "id": 5, "image": "https://.../media/blog/5.jpg" }]
}
```
(batafsil — `GET /api/dev/blog/<slug>/`)

Admin tomonida bitta postga ham bir nechta rasm biriktiriladi (xuddi
About/Projects kabi `new_images` orqali multipart yuklanadi), va
`DELETE /api/admin-control/blog/<id>/images/<image_id>/` orqali alohida
rasm o'chiriladi.

### Activites (faoliyat jadvali)

> Eslatma: bu endpoint hozircha yuborilgan swagger ro'yxatida yo'q —
> agar hali backendda qo'shilmagan bo'lsa, quyidagini qo'shish kerak,
> aks holda bosh sahifadagi jadval bo'sh ko'rinadi:

| Method | URL | Tavsif |
|---|---|---|
| GET | `/api/dev/activities/?days=30` | Ommaviy: `[{ "date": "2026-06-24", "count": 2 }, ...]` |
| GET/POST | `/api/admin-control/activities/` | Admin |
| PUT/DELETE | `/api/admin-control/activities/<id>/` | Tahrirlash/o'chirish |
| POST | `/api/admin-control/activities/log/` | Bugungi sanaga +1 |

## Ishga tushirish

```bash
npm install
npm run dev
npm run build
```

`.env` faylida `VITE_API_URL` — backend manzili.
