import Link from "next/link";
import { FolderKanban, Award, GraduationCap, Eye, PlusCircle, UserCircle2, ArrowRight } from "lucide-react";
import { dataService } from "@/lib/dataService";


export const revalidate = 0; // Disable static caching so it always reflects CMS updates in real-time

export default async function AdminDashboardPage() {
  const projects = await dataService.getProjects();
  const skills = await dataService.getSkills();
  const education = await dataService.getEducation();
 
  // Dashboard Stats Config
  const stats = [
    { name: "Total Projects", value: projects.length, icon: FolderKanban, color: "text-purple-400 bg-purple-500/5 border-purple-500/10" },
    { name: "Skills Count", value: skills.length, icon: Award, color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10" },
    { name: "Education Count", value: education.length, icon: GraduationCap, color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" },
    { name: "Portfolio Views", value: 1248, icon: Eye, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
  ];

  // Quick Action Config
  const quickActions = [
    { name: "Add New Project", desc: "Showcase a new coding build", href: "/admin/projects", icon: PlusCircle, btnText: "Go to Projects" },
    { name: "Edit About Me", desc: "Update your profile summary", href: "/admin/about", icon: UserCircle2, btnText: "Edit Profile" },
    { name: "Manage Skills", desc: "Insert or remove technical skills", href: "/admin/skills", icon: Award, btnText: "Go to Skills" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-400 mt-1">
          Welcome back! Here's a brief look at your portfolio's contents.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border flex items-center justify-between border-white/5"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.name}
                </p>
                <p className="text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions Panel */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white pl-1">Quick Actions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/15 text-purple-400">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{action.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                    </div>
                  </div>

                  <Link
                    href={action.href}
                    className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mt-2"
                  >
                    {action.btnText}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Short info Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">CMS Status</h3>
            
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Database Mode:</span>
                <span className="font-semibold text-purple-400">
                  {process.env.MONGODB_URI ? "MongoDB Atlas" : "JSON Local File Database"}
                </span>
              </p>
              <p className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Active Session:</span>
                <span className="font-semibold text-emerald-400">Logged In</span>
              </p>
              <p className="flex justify-between items-center">
                <span>Storage Provider:</span>
                <span className="font-semibold text-purple-400">
                  {process.env.CLOUDINARY_CLOUD_NAME ? "Cloudinary Active" : "Fallback (Base64/Local)"}
                </span>
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-[11px] text-gray-400 leading-normal">
            <strong>Pro Tip:</strong> Click "Back to Portfolio" in the sidebar menu or header to review how your updates render on the live website.
          </div>
        </div>

      </div>
    </div>
  );
}
