import { CheckCircle } from "lucide-react";

const NotificationBanner = () => {
  return (
    <div className="bg-success-light border-l-4 border-success py-3 px-4">
      <div className="container mx-auto">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-success mr-3" />
          <p className="text-sm font-medium text-success">
            Novas vagas disponíveis! Temos 15 novas oportunidades esta semana.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;