using AutoMapper;
using Backend.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<EquipmentDTO, Equipment>();
        CreateMap<EquipmentDTO, EquipmentPublishRequest>();

        CreateMap<EquipmentPublishRequest, EquipmentDTO>()
        .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.UserId));

        CreateMap<EquipmentPublishRequest, EquipmentResponseDTO>()
        .ForMember(dest => dest.OwnerUsername, opt => opt.MapFrom(src => src.RequestedBy.Username));

        CreateMap<Equipment, EquipmentResponseDTO>()
        .ForMember(dest => dest.OwnerUsername, opt => opt.MapFrom(src => src.Owner.Username));

        CreateMap<User, UserResponseDTO>()
        .ForMember(dest => dest.Token, opt => opt.Ignore());

        CreateMap<User, OwnerProfileInfoDTO>();

        CreateMap<RentalRequestDTO, RentalRequest>();

        CreateMap<RentalRequest, RentalRequestResponseDTO>()
        .ForMember(dest => dest.RequestedBy, opt => opt.MapFrom(src => src.User.Username));

        CreateMap<RentalRequest, Rental>()
        .ForMember(dest => dest.Renter, opt => opt.MapFrom(src => src.User))
        .ForMember(dest => dest.RentedAt, opt => opt.MapFrom(src => src.StartDate));

    }
}