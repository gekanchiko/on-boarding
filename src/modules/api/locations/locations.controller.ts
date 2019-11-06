import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { LocationsService } from "./locations.service";
import { LocationDTO } from "../dtos/location.dto";
import { RoomDTO } from "../dtos/room.dto";
import { PriceDTO } from "../dtos/price.dto";
import { AvailableRoomsDTO } from "./dtos/available-rooms.dto";

@ApiUseTags("locations")
@Controller("locations")
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService
  ) {}

  @Get()
  @ApiOperation({
    title: "Get locations",
    description: "Returns all existing locations",
  })
  @ApiOkResponse({
    description: "Provides a list of locations",
    isArray: true,
    type: [LocationDTO]
  })
  getLocations(): Promise<LocationDTO[]> {
    return this.locationsService.findAll();
  }

  @Get(":locationId/rooms")
  @ApiOperation({
    title: "Get location rooms",
    description: "Returns a list of existing rooms within a location",
  })
  @ApiOkResponse({
    description: "Provides all rooms of a location",
    isArray: true,
    type: [RoomDTO]
  })
  getRooms(
    @Param("locationId") locationId: string
  ): Promise<RoomDTO[]> {
    return this.locationsService.findRooms({ locationId });
  }

  @Get(":locationId/available")
  @ApiOperation({
    title: "Find available rooms",
    description: "Returns a list of available rooms within a location",
  })
  @ApiOkResponse({
    description: "Provides available room types and their prices",
    isArray: true,
    type: [PriceDTO]
  })
  getAvailableRooms(
    @Param("locationId") locationId: string,
    @Query() availableRoomsDTO: AvailableRoomsDTO
  ): Promise<PriceDTO[]> {
    return this.locationsService.findAvailable({ locationId, ...availableRoomsDTO });
  }

}