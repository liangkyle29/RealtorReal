package com.expense.expense.controller;

import com.expense.expense.model.Location;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import com.expense.expense.repository.LocationRepository;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class LocationController {

  @Autowired
  private LocationRepository locationRepository;

  @GetMapping("/locations")
  Collection <Location> locations(){
    return locationRepository.findAll();
  }

  @PostMapping("/location")
  ResponseEntity<Location> createLocation(@Valid @RequestBody Location location) throws URISyntaxException {
    Location result = locationRepository.save(location);
    return ResponseEntity.created(new URI("/api/location"+result.getId())).body(result);
  }

  @DeleteMapping("/location/{id}")
  ResponseEntity<?> deleteLocation(@PathVariable Integer id){
    locationRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

}
