resource "azurerm_kubernetes_cluster" "main" {
  name                = "crud-aks"
  location            = "eastus"
  resource_group_name = "portfolio"

  dns_prefix = "crud"

  default_node_pool {
    name       = "default"
    node_count = 1
    # CHANGED: Swapped out Standard_B2s for an allowed size in eastus
    vm_size    = "Standard_D2s_v7" 
  }

  identity {
    type = "SystemAssigned"
  }
}
