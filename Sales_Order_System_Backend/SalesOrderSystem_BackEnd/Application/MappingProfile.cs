using AutoMapper;
using SalesOrderSystem.BackEnd.Domain.Entities;
using SalesOrderSystem_BackEnd.API.Models;
using SalesOrderSystem_BackEnd.Domain.Entities;
using SalesOrderSystem_BackEnd.Models;

namespace SalesOrderSystem.BackEnd.Application;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Customer, CustomerDto>();
        CreateMap<Item, ItemDto>();
        CreateMap<SalesOrder, SalesOrderDto>()
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.Name))
            .ForMember(dest => dest.Address1, opt => opt.MapFrom(src => src.Customer.Address1))
            .ForMember(dest => dest.Address2, opt => opt.MapFrom(src => src.Customer.Address2))
            .ForMember(dest => dest.Address3, opt => opt.MapFrom(src => src.Customer.Address3))
            .ForMember(dest => dest.Suburb, opt => opt.MapFrom(src => src.Customer.Suburb))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.Customer.State))
            .ForMember(dest => dest.PostCode, opt => opt.MapFrom(src => src.Customer.PostCode));
        CreateMap<OrderItem, OrderItemDto>();
        CreateMap<Item, ItemDto>();
        CreateMap<ItemDto, Item>();
        CreateMap<Customer, CustomerDto>();
        CreateMap<CustomerDto, Customer>();
        CreateMap<SalesOrderDto, SalesOrder>()
            .ForMember(dest => dest.InvoiceDate, opt => opt.Ignore())
            .ReverseMap();

        CreateMap<OrderItemDto, OrderItem>().ReverseMap();
    }
}