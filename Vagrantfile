Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.network :private_network, ip: "10.10.0.100"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "deploy/ansible/vagrant.yml"
  end
end
