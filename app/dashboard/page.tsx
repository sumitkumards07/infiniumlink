export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-[1.75rem] bg-[#1e2330] px-6 py-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a8ad9c]">Overview</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">Your LinkFlow workspace</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
          Keep your page fresh, test new content quickly, and publish updates with the new visual
          system already applied across landing, auth, and profile experiences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.5rem] border border-[#ebe8df] bg-[#f7f6f2] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.05)]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#676b5f]">Total Views</h3>
          <p className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">--</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#ebe8df] bg-white p-6 shadow-[0_10px_24px_rgba(30,35,48,0.05)]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#676b5f]">Total Clicks</h3>
          <p className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">--</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#cddf31] bg-[#d2e823] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.08)]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#485000]">Publishing</h3>
          <p className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">Live</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#d7c5d5] bg-[#e9c0e9] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.06)]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4e56]">Theme</h3>
          <p className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">Copied</p>
        </div>
      </div>
    </div>
  );
}
