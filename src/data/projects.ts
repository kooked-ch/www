export type Project = {
  id: string;
  title: string;
  link: string;
};

export const projects: Project[] = [
  { id: "music", title: "Kooked Music", link: "https://musics.kooked.ch" },
  { id: "pictures", title: "Kooked Pictures", link: "https://pictures.kooked.ch" },
  { id: "grafana", title: "Grafana", link: "https://grafana.kooked.ch" },
  { id: "md2pdf", title: "Markdown to PDF", link: "https://md2pdf.kooked.app" },
  { id: "password-game", title: "Password Game", link: "https://password-game.kooked.app" },
  { id: "uptime-kuma", title: "Uptime Kuma", link: "https://kuma.kooked.app" },
  { id: "url-shortener", title: "URL Shortener", link: "https://go.kooked.app" },
  { id: "api-ict", title: "API ICT", link: "https://api-ict.kooked.app" },
  { id: "moodle", title: "Kooked Moodle", link: "https://moodle.kooked.ch" },
];
