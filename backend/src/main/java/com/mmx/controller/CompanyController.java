package com.mmx.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCompanies() {
        List<Map<String, Object>> companies = Arrays.asList(
            createCompanyGroup(1, "Groupe Automobile France", "Holding", 1200,
                Arrays.asList(
                    createCompanyGroup(2, "Auto Distribution SA", "Distribution", 350,
                        Arrays.asList(
                            createCompany(3, "Concession Paris Nord", "Concession", 45),
                            createCompany(4, "Concession Lyon Sud", "Concession", 38),
                            createCompany(5, "Concession Marseille Est", "Concession", 32)
                        )
                    ),
                    createCompanyGroup(6, "Fleet Solutions SARL", "Location", 120,
                        Arrays.asList(
                            createCompany(7, "Location Paris", "Agence", 25),
                            createCompany(8, "Location Lyon", "Agence", 20),
                            createCompany(9, "Location Nice", "Agence", 18)
                        )
                    ),
                    createCompany(10, "Centre Technique National", "Maintenance", 85)
                )
            ),
            createCompanyGroup(11, "Tech Innovators Inc", "Startup", 185,
                Arrays.asList(
                    createCompany(12, "R&D Department", "Recherche", 45),
                    createCompany(13, "Sales Division", "Ventes", 65),
                    createCompanyGroup(14, "International Offices", "Bureaux", 75,
                        Arrays.asList(
                            createCompany(15, "Tech EU - Berlin", "Bureau", 25),
                            createCompany(16, "Tech EU - Paris", "Bureau", 22),
                            createCompany(17, "Tech US - San Francisco", "Bureau", 28)
                        )
                    )
                )
            ),
            createCompany(18, "Family Business SARL", "PME", 24),
            createCompany(19, "Logistics Experts", "Logistique", 42)
        );
        
        return ResponseEntity.ok(companies);
    }

    @PostMapping("/{companyId}/fleet-proposal")
    public ResponseEntity<Map<String, Object>> sendFleetProposal(
            @PathVariable int companyId,
            @RequestBody Map<String, Object> proposal) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Proposition de flotte envoyée");
        response.put("companyId", companyId);
        response.put("proposal", proposal);
        response.put("sentAt", new Date());
        response.put("estimatedVehicles", proposal.getOrDefault("vehicleCount", 10));
        response.put("totalValue", proposal.getOrDefault("totalValue", 250000));
        response.put("validUntil", new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000)); // +30 jours
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{companyId}/subsidiaries")
    public ResponseEntity<List<Map<String, Object>>> getSubsidiaries(@PathVariable int companyId) {
        // Simulation - dans la réalité, on irait chercher en base
        List<Map<String, Object>> subsidiaries = new ArrayList<>();
        
        if (companyId == 1) {
            subsidiaries.add(createCompany(2, "Auto Distribution SA", "Distribution", 350));
            subsidiaries.add(createCompany(6, "Fleet Solutions SARL", "Location", 120));
            subsidiaries.add(createCompany(10, "Centre Technique National", "Maintenance", 85));
        } else if (companyId == 2) {
            subsidiaries.add(createCompany(3, "Concession Paris Nord", "Concession", 45));
            subsidiaries.add(createCompany(4, "Concession Lyon Sud", "Concession", 38));
            subsidiaries.add(createCompany(5, "Concession Marseille Est", "Concession", 32));
        }
        
        return ResponseEntity.ok(subsidiaries);
    }

    @PostMapping("/bulk-fleet-proposal")
    public ResponseEntity<Map<String, Object>> sendBulkFleetProposal(
            @RequestBody Map<String, Object> bulkProposal) {
        
        List<Integer> companyIds = (List<Integer>) bulkProposal.getOrDefault("companyIds", new ArrayList<>());
        Map<String, Object> proposal = (Map<String, Object>) bulkProposal.get("proposal");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Propositions de flotte envoyées en masse");
        response.put("companiesCount", companyIds.size());
        response.put("proposal", proposal);
        response.put("sentAt", new Date());
        
        // Simuler l'envoi à chaque société
        List<Map<String, Object>> results = new ArrayList<>();
        for (int companyId : companyIds) {
            Map<String, Object> result = new HashMap<>();
            result.put("companyId", companyId);
            result.put("status", "sent");
            result.put("reference", "FLEET-" + companyId + "-" + System.currentTimeMillis());
            results.add(result);
        }
        
        response.put("results", results);
        
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createCompany(int id, String name, String type, int employees) {
        Map<String, Object> company = new HashMap<>();
        company.put("id", id);
        company.put("name", name);
        company.put("type", type);
        company.put("employees", employees);
        company.put("isGroup", false);
        company.put("createdAt", new Date());
        return company;
    }

    private Map<String, Object> createCompanyGroup(int id, String name, String type, int employees, 
                                                   List<Map<String, Object>> subsidiaries) {
        Map<String, Object> company = createCompany(id, name, type, employees);
        company.put("isGroup", true);
        company.put("subsidiaries", subsidiaries);
        company.put("totalEmployees", calculateTotalEmployees(subsidiaries) + employees);
        return company;
    }

    private int calculateTotalEmployees(List<Map<String, Object>> companies) {
        int total = 0;
        for (Map<String, Object> company : companies) {
            total += (int) company.get("employees");
            if ((boolean) company.getOrDefault("isGroup", false)) {
                total += calculateTotalEmployees((List<Map<String, Object>>) company.get("subsidiaries"));
            }
        }
        return total;
    }
}
