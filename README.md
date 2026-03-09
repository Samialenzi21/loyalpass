# LoyalPass - نظام بطاقات الولاء الرقمية

منصة SaaS لإصدار بطاقات ولاء رقمية مباشرة إلى **Google Wallet** و **Apple Wallet** لأصحاب المحلات التجارية.

## التقنيات المستخدمة

- **Frontend**: HTML, CSS (Tailwind), Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Replit / Vercel / Netlify

## الميزات

- تسجيل وتسجيل دخول التجار
- إنشاء بطاقات ولاء بتصميم مخصص
- مسح بطاقة الزبون عبر QR Code
- إضافة نقاط وتوزيع مكافآت
- لوحة تحكم للتاجر مع إحصائيات لحظية
- Multi-Tenant (كل تاجر وبياناته منفصلة)

## الإعداد

### 1. إنشاء مشروع Supabase

1. افتح [supabase.com](https://supabase.com) وأنشئ مشروع جديد
2. افتح **SQL Editor** وشغّل هذا:

```sql
CREATE TABLE merchants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  business_name TEXT NOT NULL,
  logo_url TEXT,
  card_color TEXT DEFAULT '#6C47FF',
  points_label TEXT DEFAULT 'قهوة',
  reward_threshold INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),
  name TEXT,
  phone TEXT,
  points INT DEFAULT 0,
  total_visits INT DEFAULT 0,
  total_rewards INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),
  customer_id UUID REFERENCES customers(id),
  type TEXT CHECK (type IN ('add_point', 'redeem')),
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchant_own" ON merchants FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "merchant_customers" ON customers FOR ALL USING (merchant_id IN (SELECT id FROM merchants WHERE user_id = auth.uid()));
CREATE POLICY "merchant_scans" ON scans FOR ALL USING (merchant_id IN (SELECT id FROM merchants WHERE user_id = auth.uid()));
```

### 2. إعداد `src/supabase.js`

عدّل الملف ببيانات مشروعك:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'ey...'
```

### 3. رفع المشروع على Replit

1. افتح [replit.com/import](https://replit.com/import)
2. اختر **Import from GitHub**
3. أدخل رابط هذا المستودع
4. اضغط **Run** وافتح الرابط

##  الملفات المطلوبة

```
loyalpass/
├── index.html          ││ صفحة Landing + تسجيل
├── dashboard.html      ││ لوحة التحكم
├── scan.html           ││ صفحة مسح QR
├── customers.html      ││ قائمة الزبائن
└── src/
    ├── supabase.js     ││ الاتصال بـ Supabase
    ├── auth.js         ││ منطق تسجيل الدخول
    ├── scan.js         ││ منطق المسح
    └── stats.js        ││ الإحصائيات
```

## الخطوة التالية

- إضافة محرر البطاقة (`editor.html`)
- دمج Google Wallet API
- دمج Apple Wallet (PassKit)
- نظام الاشتراك عبر Stripe

## الترخيص

MIT License - مفتوح المصدر
