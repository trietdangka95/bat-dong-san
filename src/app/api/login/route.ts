import { NextRequest, NextResponse } from "next/server";

// Mock users
// super admin
//   email: super@admin.com, password: 123456 -> role: super_admin
// admin
//   email: admin@tenant.local, password: 123456 -> role: admin

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    // Simple mock auth
    if (email === "super@admin.com" && password === "123456") {
      return NextResponse.json({ ok: true, role: "super_admin" });
    }

    if (email === "admin@tenant.local" && password === "123456") {
      return NextResponse.json({ ok: true, role: "admin" });
    }

    return NextResponse.json(
      { ok: false, error: "Sai thông tin đăng nhập" },
      { status: 401 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
