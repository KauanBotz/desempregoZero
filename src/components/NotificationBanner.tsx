import { CheckCircle } from "lucide-react";

const NotificationBanner = () => {
  return (
    <div className="bg-muted border border-border py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center space-x-2 text-foreground">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium">
              Novas vagas disponíveis! Temos 0 novas oportunidades esta semana.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;