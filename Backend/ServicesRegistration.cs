using Backend.Services;

public static class ServicesRegistration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<AuthorizationService>();
        services.AddScoped<EquipmentService>();
        services.AddScoped<UserService>();
        services.AddScoped<JwtService>();
        services.AddScoped<EquipmentPublishRequestService>();
        services.AddScoped<RentalRequestService>();
        services.AddScoped<RoleChangeRequestService>();
        
    }
}